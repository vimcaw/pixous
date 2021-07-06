import { Flex, View, Text } from '@adobe/react-spectrum';
import { observer } from 'mobx-react-lite';
import store from '@store';
import Canvas from '@Canvas';

export default observer(() => (
  <Flex flexGrow={1} width={0} direction="column">
    <View backgroundColor="gray-300" paddingX="size-200" paddingY="size-100">
      {store.activeDocument!.name}
    </View>
    <Canvas />
    <View backgroundColor="gray-300" paddingY="size-0">
      <Flex>
        <View backgroundColor="gray-200" width="size-1200" paddingX="size-100" paddingY="size-50">
          <Flex justifyContent="center">
            <Text>{(store.activeDocument!.viewOptions.scale * 100).toFixed(2)}%</Text>
          </Flex>
        </View>
        <View paddingX="size-200" paddingY="size-50">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          {store.activeDocument!.width}×{store.activeDocument!.height}
        </View>
      </Flex>
    </View>
  </Flex>
));
