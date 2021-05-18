import { useMeasure } from 'react-use';
import { Stage } from '@inlet/react-pixi';
import { View } from '@adobe/react-spectrum';
import { ReactReduxContext } from 'react-redux';
import Viewport from './Viewport';
import Background from './Background';

export default function Canvas() {
  const [ref, canvasContainerRect] = useMeasure();

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
        <ReactReduxContext.Consumer>
          {value => (
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
              <ReactReduxContext.Provider value={value}>
                <Viewport>
                  <Background />
                </Viewport>
              </ReactReduxContext.Provider>
            </Stage>
          )}
        </ReactReduxContext.Consumer>
      )}
    </View>
  );
}
