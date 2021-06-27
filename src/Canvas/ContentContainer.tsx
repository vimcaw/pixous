import { ReactNode, useState } from 'react';
import { Container, Graphics } from '@inlet/react-pixi';
import { Graphics as PixiGraphics } from 'pixi.js';
import { observer } from 'mobx-react-lite';
import store from '@store';

export default observer(({ children }: { children?: ReactNode }) => {
  if (!store.activeDocument) throw new Error();
  const [mask, maskRef] = useState<PixiGraphics | null>(null);

  return (
    <Container
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
