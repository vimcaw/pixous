import {
  Flex,
  Heading,
  ButtonGroup,
  Button,
  Content,
  IllustratedMessage,
  View,
} from '@adobe/react-spectrum';
import Upload from '@spectrum-icons/illustrations/Upload';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import store from '@store';
import CreateDocument from './CreateDocument';

export default function Home() {
  const { t } = useTranslation();
  const [isCreatingDocument, setCreatingDocumentStatus] = useState(false);
  const onPickFile = useCallback((event: Event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const file = input.files?.[0];
    if (!file) return;
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.src = url;
    image.onload = () => {
      store.addDocument({
        name: file.name,
        width: image.width,
        height: image.height,
        image: url,
      });
    };
  }, []);
  const [fileInput] = useState(() => {
    const fileInputElement = document.createElement('input');
    fileInputElement.type = 'file';
    fileInputElement.accept = 'image/png,image/jpeg';
    fileInputElement.onchange = onPickFile;
    return fileInputElement;
  });

  if (isCreatingDocument)
    return <CreateDocument onCancel={() => setCreatingDocumentStatus(false)} />;

  return (
    <View width="100vw" height="100vh" paddingX="size-600" paddingY="size-300">
      <Flex direction="column" gap="size-100" height="100%">
        <Flex alignItems="end" gap="size-200" marginBottom="size-300">
          <Heading level={1}>Pixous</Heading>
          <Heading level={3} marginBottom="size-300">
            {t('appDescription')}
          </Heading>
        </Flex>
        <Flex flex={1} justifyContent="center" alignItems="center">
          <IllustratedMessage>
            <Upload />
            <Heading level={2}>{t('emptyTip')}</Heading>
            <Content marginTop="size-800">
              <ButtonGroup flexShrink={0}>
                <Button variant="secondary" onPress={() => setCreatingDocumentStatus(true)}>
                  {t('newFile')}
                </Button>
                <Button
                  variant="secondary"
                  onPress={() => {
                    fileInput.click();
                  }}
                >
                  {t('openImage')}
                </Button>
              </ButtonGroup>
            </Content>
          </IllustratedMessage>
        </Flex>
      </Flex>
    </View>
  );
}
