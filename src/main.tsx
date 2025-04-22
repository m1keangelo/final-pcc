
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Simple error handler for the whole application
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

try {
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error('Failed to render the application:', error);
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
      <h1>Application Error</h1>
      <p>Sorry, something went wrong. Please try refreshing the page.</p>
      <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 16px;">Refresh Page</button>
    </div>
  `;
}
