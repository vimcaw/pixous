import { EntityId } from '@reduxjs/toolkit';
import { Flex, View, ActionButton, Text } from '@adobe/react-spectrum';
import Visibility from '@spectrum-icons/workflow/Visibility';
import VisibilityOff from '@spectrum-icons/workflow/VisibilityOff';
import { useDispatch } from 'react-redux';
import { useLayerById, switchLayerVisible } from '@store';

export default function Layer({ id }: { id: EntityId }) {
  const layer = useLayerById(id);
  const dispatch = useDispatch();

  if (!layer) return null;

  return (
    <Flex alignItems="center">
      <ActionButton isQuiet onPress={() => dispatch(switchLayerVisible(id))}>
        {layer.visible ? <Visibility /> : <VisibilityOff />}
      </ActionButton>
      <View flexGrow={1} backgroundColor="gray-400" padding="size-100">
        <Flex alignItems="center">
          <View backgroundColor="gray-100" width="size-600" height="size-600" />
          <Text marginStart="size-600">{layer.name}</Text>
        </Flex>
      </View>
    </Flex>
  );
}
