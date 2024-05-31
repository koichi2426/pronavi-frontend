import React from 'react';
import { createRoot } from 'react-dom/client'; // createRootをインポート
import { UIProvider } from '@yamada-ui/react';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <UIProvider>
    <App />
  </UIProvider>
);
