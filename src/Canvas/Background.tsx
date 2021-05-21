import { Graphics } from '@inlet/react-pixi';
import { observer } from 'mobx-react-lite';
import store from '@store';

const GRID_SIZE = 20;
const GRID_COLOR = 0xc8c8c8;
const BACKGROUND_COLOR = 0xffffff;

export default observer(() => (
  <Graphics
    draw={g => {
      g.clear();
      if (!store.activeDocument) return;
      g.beginFill(BACKGROUND_COLOR);
      g.drawRect(0, 0, store.activeDocument.width, store.activeDocument.height);
      g.beginFill(GRID_COLOR);
      let flag = true;
      for (let x = 0; x < store.activeDocument.width; x += GRID_SIZE, flag = !flag) {
        for (let y = flag ? 0 : GRID_SIZE; y < store.activeDocument.height; y += GRID_SIZE * 2) {
          g.drawRect(x, y, GRID_SIZE, GRID_SIZE);
        }
      }
    }}
  />
));
