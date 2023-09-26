import { inject } from '@vercel/analytics';
import ReactDOM from 'react-dom/client';
import App from './app';

inject();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
