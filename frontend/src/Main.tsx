import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import React from 'react';

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App />);
} else {
    console.error('Root element not found');
}
