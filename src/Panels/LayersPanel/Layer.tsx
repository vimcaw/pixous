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
      <View backgroundColor="gray-200" width="size-600" height="size-600" />
      <Text marginStart="size-200">{layer.name}</Text>
    </Flex>
  );
}
