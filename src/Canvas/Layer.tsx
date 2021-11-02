import { Sprite, Graphics } from '@inlet/react-pixi';
import { observer } from 'mobx-react-lite';
import store from '@store';
import { ILayer } from '@store/Layer';

export default observer(({ layer }: { layer: ILayer }) => {
  if (!store.activeDocument) return null;
  const { width, height } = store.activeDocument;
  if (layer.visible && layer.image) {
    return <Sprite image={layer.image} />;
  }
  if (layer.visible && layer.fill) {
    return (
      <Graphics
        draw={g => {
          g.clear();
          g.beginFill(layer.fill);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />
    );
  }
  return null;
});
