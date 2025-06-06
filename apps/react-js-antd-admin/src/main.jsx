import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

// components
import App from './App.jsx';
import ProgressBar from './components/ProgressBar';

// css
import "./styles/index.css";



const root = createRoot(document.getElementById('root'));
root.render(
  <Suspense>
    <ProgressBar />
    <App />
  </Suspense>
);
