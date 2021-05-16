import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as SpectrumProvider, darkTheme } from '@adobe/react-spectrum';
import './i18n';
import './index.scss';
import store from './store';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <SpectrumProvider theme={darkTheme}>
        <App />
      </SpectrumProvider>
    </ReduxProvider>
  </StrictMode>,
  document.getElementById('root')
);
