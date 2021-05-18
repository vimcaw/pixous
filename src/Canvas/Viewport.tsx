import { PixiComponent, useApp } from '@inlet/react-pixi';
import { Viewport as PixiViewport } from 'pixi-viewport';
import { Application } from 'pixi.js';
import {
  useCallback,
  createContext,
  useState,
  RefCallback,
  PropsWithChildren,
  useEffect,
  useContext,
} from 'react';

const ViewportContext = createContext<PixiViewport | null>(null);

export function useViewport(): PixiViewport {
  return useContext(ViewportContext) as PixiViewport;
}

export interface ViewportProps {
  scale?: number;
  onZoomed?: (scale: number) => void;
}

const PixiViewportComponent = PixiComponent<
  {
    app: Application;
    scale?: number;
  },
  PixiViewport
>('Viewport', {
  create: ({ app }) => {
    const viewport = new PixiViewport({
      screenWidth: app.renderer.width / app.renderer.resolution,
      screenHeight: app.renderer.height / app.renderer.resolution,
      interaction: app.renderer.plugins.interaction,
    });

    // 激活插件
    viewport.drag().pinch().wheel();

    // 设置 viewport 默认中心和缩放
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
  applyProps: (viewport, _, { scale }) => {
    if (scale && scale.toFixed(2) !== viewport.scaled.toFixed(2)) {
      viewport.setZoom(scale, true);
    }
  },
});

export default function Viewport({ scale, onZoomed, children }: PropsWithChildren<ViewportProps>) {
  const app = useApp();
  const [viewportInstance, setViewportInstance] = useState<PixiViewport | null>(null);
  const viewportRef = useCallback<RefCallback<unknown>>(currentViewportInstance => {
    if (currentViewportInstance) {
      setViewportInstance(currentViewportInstance as PixiViewport);
    }
  }, []);

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
    <PixiViewportComponent ref={viewportRef} app={app} scale={scale}>
      <ViewportContext.Provider value={viewportInstance}>
        {viewportInstance && children}
      </ViewportContext.Provider>
    </PixiViewportComponent>
  );
}
