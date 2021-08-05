import { Flex, View, Text, ActionButton, TooltipTrigger, Tooltip } from '@adobe/react-spectrum';
import CloseCircle from '@spectrum-icons/workflow/CloseCircle';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import store from '@store';
import Canvas from '@Canvas';

export default observer(() => {
  const { t } = useTranslation();
  return (
    <Flex flexGrow={1} width={0} direction="column">
      <View backgroundColor="gray-300" paddingX="size-200" paddingY="size-100">
        <Flex justifyContent="center" alignItems="center">
          <Text>{store.activeDocument!.name}</Text>
          <TooltipTrigger>
            <ActionButton isQuiet onPress={store.closeDocument} marginStart="size-100">
              <CloseCircle />
            </ActionButton>
            <Tooltip>{t('close')}</Tooltip>
          </TooltipTrigger>
        </Flex>
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
  );
});
