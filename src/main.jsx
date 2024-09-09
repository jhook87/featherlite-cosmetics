import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering the app
import App from './App'; // Assuming App.jsx is your root component
import './App.css'; // Import your global styles

// Use ReactDOM to render your app into the root element in your HTML file
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
