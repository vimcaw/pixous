import { observer } from 'mobx-react-lite';
import store from '@store';
import Home from './Home';
import Editor from './Editor';

export default observer(() => (store.activeDocument ? <Editor /> : <Home />));
