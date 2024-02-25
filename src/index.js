import { createRoot } from 'react-dom/client';
import App from './App';
import ContextProvider from "./components/context/ContextProvider"

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
