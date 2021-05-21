import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider as SpectrumProvider, darkTheme } from '@adobe/react-spectrum';
import './i18n';
import './index.scss';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <SpectrumProvider theme={darkTheme}>
      <App />
    </SpectrumProvider>
  </StrictMode>,
  document.getElementById('root')
);
