import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';
import App from './App';
/*global process, module */
const container = document.getElementById('root');

const root = createRoot(container);
root.render(<App />);

const devMode = process.env.NODE_ENV === 'development';
if (devMode && module && module.hot) {
	module.hot.accept();
}
