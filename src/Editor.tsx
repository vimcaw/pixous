import { Flex, View } from '@adobe/react-spectrum';
import { useActiveDocument } from './store';

export default function Editor() {
  const activeDocument = useActiveDocument()!;

  return (
    <Flex>
      <View>{activeDocument.name}</View>
    </Flex>
  );
}
