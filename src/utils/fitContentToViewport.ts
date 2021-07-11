import { Viewport } from 'pixi-viewport';
import canvasInstances from '@utils/canvasInstances';

export default function fitContentToViewport(viewport: Viewport, scaleRatio = 0.85) {
  if (!canvasInstances.contentContainer) throw new Error(`Content container doesn't exist`);
  const { screenWidth, screenHeight, worldScreenWidth, worldScreenHeight } = viewport;
  const { x, y, width, height } = canvasInstances.contentContainer.getBounds();
  const worldContainerWidth = (width * worldScreenWidth) / screenWidth;
  const worldContainerHeight = (height * worldScreenHeight) / screenHeight;
  let scale =
    Math.min(screenWidth / worldContainerWidth, screenHeight / worldContainerHeight) * scaleRatio;
  if (Number.isNaN(scale) || scale === 0) scale = scaleRatio;
  viewport.moveCenter(viewport.toWorld(x + width / 2, y + height / 2));
  viewport.setZoom(scale, true);
  return scale;
}
