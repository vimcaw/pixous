import { useHasActiveDocument } from './store';
import Home from './Home';
import Editor from './Editor';

export default function App() {
  const hasActiveDocument = useHasActiveDocument();
  return hasActiveDocument ? <Editor /> : <Home />;
}
