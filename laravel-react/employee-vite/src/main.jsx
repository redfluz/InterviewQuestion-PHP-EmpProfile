import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
        <Router> {/* Wrap Form in Router */}
            <App />
        </Router>
);
