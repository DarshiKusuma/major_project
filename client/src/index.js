import React from 'react';
import Reaction from 'react-dom/client';
import './index.css';
import App from './App';


const root = Reaction.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)