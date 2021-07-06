import { useMeasure } from 'react-use';
import { Stage } from '@inlet/react-pixi';
import { View } from '@adobe/react-spectrum';
import { observer } from 'mobx-react-lite';
import store from '@store';
import Viewport from './Viewport';
import ContentContainer from './ContentContainer';
import Background from './Background';
import Layer from './Layer';

export default observer(() => {
  const [ref, canvasContainerRect] = useMeasure();
  if (!store.activeDocument) throw new Error('Document not found');

  return (
    <View
      flexGrow={1}
      overflow="hidden"
      ref={instance => {
        const node = instance?.UNSAFE_getDOMNode();
        if (node) ref(node);
      }}
    >
      {canvasContainerRect.width > 0 && canvasContainerRect.height > 0 && (
        <Stage
          width={canvasContainerRect.width}
          height={canvasContainerRect.height}
          raf={false}
          renderOnComponentChange
          options={{
            backgroundColor: 0x1e1e1e,
            autoDensity: true,
            resolution: window.devicePixelRatio,
          }}
        >
          <Viewport
            scale={store.activeDocument.viewOptions.scale}
            onZoomed={scale => store.activeDocument?.viewOptions.setScale(scale)}
          >
            <ContentContainer>
              <Background />
              {store.activeDocument.layers.map(layer => (
                <Layer key={layer.id} layer={layer} />
              ))}
            </ContentContainer>
          </Viewport>
        </Stage>
      )}
    </View>
  );
});
