import { Graphics } from '@inlet/react-pixi';
import { useActiveDocumentSize } from '@store';

const GRID_SIZE = 20;
const GRID_COLOR = 0xc8c8c8;
const BACKGROUND_COLOR = 0xffffff;

export default function Background() {
  const activeDocumentSize = useActiveDocumentSize();

  if (!activeDocumentSize) return null;

  return (
    <Graphics
      draw={g => {
        g.clear();
        g.beginFill(BACKGROUND_COLOR);
        g.drawRect(0, 0, activeDocumentSize.width, activeDocumentSize.height);
        g.beginFill(GRID_COLOR);
        let flag = true;
        for (let x = 0; x < activeDocumentSize.width; x += GRID_SIZE, flag = !flag) {
          for (let y = flag ? 0 : GRID_SIZE; y < activeDocumentSize.height; y += GRID_SIZE * 2) {
            g.drawRect(x, y, GRID_SIZE, GRID_SIZE);
          }
        }
      }}
    />
  );
}
