import { Provider, darkTheme } from '@adobe/react-spectrum';
import Home from './Home';

export default function App() {
  return (
    <Provider theme={darkTheme}>
      <Home />
    </Provider>
  );
}
