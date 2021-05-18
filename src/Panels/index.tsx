import { Flex, View } from '@adobe/react-spectrum';
import { useActiveLayerIds } from '@store';
import Layer from './LayersPanel/Layer';

export default function Panels() {
  const activeLayerIds = useActiveLayerIds();
  return (
    <Flex flexShrink={0} direction="column" width="size-5000">
      <View backgroundColor="gray-300" padding="size-100" flexGrow={1}>
        {activeLayerIds?.map(layerId => (
          <Layer key={layerId} id={layerId} />
        ))}
      </View>
    </Flex>
  );
}
