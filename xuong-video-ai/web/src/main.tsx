import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import { initStore } from './store';

initStore().then(() => createRoot(document.getElementById('root')!).render(<App />));
