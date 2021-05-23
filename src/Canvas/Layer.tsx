import { Sprite } from '@inlet/react-pixi';
import { observer } from 'mobx-react-lite';
import { ILayer } from '@store/Layer';

export default observer(({ layer }: { layer: ILayer }) => {
  if (layer.visible && layer.image) {
    return <Sprite image={layer.image} />;
  }
  return null;
});
