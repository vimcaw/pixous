import { Flex } from '@adobe/react-spectrum';
import DocumentWindow from './DocumentWindow';
import Panels from './Panels';

export default function Editor() {
  return (
    <Flex width="100vw" height="100vh">
      <DocumentWindow />
      <Panels />
    </Flex>
  );
}
