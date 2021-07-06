import { PixiComponent, useApp } from '@inlet/react-pixi';
import { Viewport as PixiViewport, IClampZoomOptions } from 'pixi-viewport';
import { Application } from 'pixi.js';
import {
  useCallback,
  createContext,
  useState,
  RefCallback,
  PropsWithChildren,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { observer } from 'mobx-react-lite';
import store from '@store';

const ViewportContext = createContext<PixiViewport | null>(null);

export function useViewport(): PixiViewport {
  return useContext(ViewportContext) as PixiViewport;
}

export interface ViewportProps {
  scale?: number;
  clampZoomOptions?: IClampZoomOptions;
  onZoomed?: (scale: number) => void;
}

const PixiViewportComponent = PixiComponent<{ app: Application } & ViewportProps, PixiViewport>(
  'Viewport',
  {
    create: ({ app, clampZoomOptions }) => {
      const viewport = new PixiViewport({
        screenWidth: app.renderer.width / app.renderer.resolution,
        screenHeight: app.renderer.height / app.renderer.resolution,
        interaction: app.renderer.plugins.interaction,
      });
      viewport.drag().pinch().wheel();
      if (clampZoomOptions) {
        viewport.clampZoom(clampZoomOptions);
      }
      viewport.moveCenter(0, 0);
      viewport.setZoom(1, true);

      function update() {
        if (viewport.dirty) {
          app.renderer.render(viewport);
          viewport.dirty = false;
        }
        requestAnimationFrame(() => update());
      }
      update();

      return viewport;
    },
    applyProps: (viewport, _, { scale, clampZoomOptions }) => {
      if (clampZoomOptions) {
        viewport.clampZoom(clampZoomOptions);
      }
      if (scale && scale.toFixed(2) !== viewport.scaled.toFixed(2)) {
        viewport.setZoom(scale, true);
      }
    },
  }
);

export default observer(
  ({
    scale,
    minScale = 0,
    maxScale = 128,
    onZoomed,
    children,
  }: PropsWithChildren<
    ViewportProps & { minScale?: number; maxScale?: number; defaultScaleScale?: number }
  >) => {
    const app = useApp();
    const [viewportInstance, setViewportInstance] = useState<PixiViewport | null>(null);
    const viewportRef = useCallback<RefCallback<unknown>>(currentViewportInstance => {
      if (currentViewportInstance) {
        setViewportInstance(currentViewportInstance as PixiViewport);
      }
    }, []);

    const clampZoomOptions = useMemo<IClampZoomOptions | undefined>(() => {
      if (!store.activeDocument) return undefined;
      const screenWidth = app.view.offsetWidth;
      const screenHeight = app.view.offsetHeight;

      return {
        minWidth: screenWidth / maxScale,
        minHeight: screenHeight / maxScale,
        maxWidth: screenWidth / minScale,
        maxHeight: screenHeight / minScale,
      };
    }, [app.view.offsetHeight, app.view.offsetWidth, maxScale, minScale]);

    useEffect(() => {
      if (viewportInstance && typeof onZoomed === 'function') {
        const onViewportZoomed = (e: any) => {
          requestAnimationFrame(() => {
            onZoomed(e.viewport.scaled);
          });
        };
        viewportInstance.on('zoomed', onViewportZoomed);
        return () => {
          viewportInstance.off('zoomed', onViewportZoomed);
        };
      }
    }, [onZoomed, viewportInstance]);

    return (
      <PixiViewportComponent
        ref={viewportRef}
        app={app}
        scale={scale}
        clampZoomOptions={clampZoomOptions}
      >
        <ViewportContext.Provider value={viewportInstance}>
          {viewportInstance && children}
        </ViewportContext.Provider>
      </PixiViewportComponent>
    );
  }
);
