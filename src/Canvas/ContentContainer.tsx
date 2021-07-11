import { ReactNode, RefCallback, useCallback, useState } from 'react';
import { Container, Graphics } from '@inlet/react-pixi';
import { Graphics as PixiGraphics, Container as PixiContainer } from 'pixi.js';
import { observer } from 'mobx-react-lite';
import store from '@store';
import canvasInstances from '@utils/canvasInstances';

export default observer(({ children }: { children?: ReactNode }) => {
  if (!store.activeDocument) throw new Error();
  const [mask, maskRef] = useState<PixiGraphics | null>(null);
  const containerRef = useCallback<RefCallback<PixiContainer>>(instance => {
    canvasInstances.contentContainer = instance;
  }, []);

  return (
    <Container
      ref={containerRef}
      x={0}
      y={0}
      width={store.activeDocument?.width}
      height={store.activeDocument?.height}
      mask={mask}
    >
      <Graphics
        draw={g => {
          g.clear();
          g.beginFill(0xffffff);
        }}
      />
      <Graphics
        ref={maskRef}
        draw={g => {
          g.clear();
          g.beginFill(0xffffff);
          g.drawRect(0, 0, store.activeDocument!.width, store.activeDocument!.height);
          g.endFill();
        }}
      />
      {children}
    </Container>
  );
});
