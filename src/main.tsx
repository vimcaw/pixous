import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as SpectrumProvider, darkTheme } from '@adobe/react-spectrum';
import './i18n';
import './index.scss';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('No container found');
const root = createRoot(container);

root.render(
  <StrictMode>
    <SpectrumProvider theme={darkTheme}>
      <App />
    </SpectrumProvider>
  </StrictMode>
);
