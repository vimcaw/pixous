import { Flex, View } from '@adobe/react-spectrum';
import { observer } from 'mobx-react-lite';
import store from '@store';
import Layer from './LayersPanel/Layer';

export default observer(() => (
  <Flex flexShrink={0} direction="column" width="size-5000">
    <View backgroundColor="gray-300" padding="size-100" flexGrow={1}>
      {store.activeDocument?.layers.map(layer => (
        <Layer key={layer.id} layer={layer} />
      ))}
    </View>
  </Flex>
));
