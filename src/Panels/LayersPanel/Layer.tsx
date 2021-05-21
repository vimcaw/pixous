import { Flex, View, ActionButton, Text } from '@adobe/react-spectrum';
import { observer } from 'mobx-react-lite';
import Visibility from '@spectrum-icons/workflow/Visibility';
import { ILayer } from '@store/Layer';

export default observer(({ layer: { name, visible, switchVisible } }: { layer: ILayer }) => (
  <Flex alignItems="center">
    <ActionButton isQuiet onPress={switchVisible}>
      {visible ? (
        <Visibility />
      ) : (
        <View
          width="size-200"
          height="size-200"
          marginX="size-100"
          borderWidth="thick"
          borderColor="gray-200"
        />
      )}
    </ActionButton>
    <View flexGrow={1} backgroundColor="gray-400" padding="size-100">
      <Flex alignItems="center">
        <View backgroundColor="gray-100" width="size-600" height="size-600" />
        <Text marginStart="size-100">{name}</Text>
      </Flex>
    </View>
  </Flex>
));
