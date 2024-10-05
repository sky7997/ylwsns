import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Check for service worker updates
navigator.serviceWorker.onupdatefound = () => {
    const installingWorker = navigator.serviceWorker.installing;
    installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
                console.log('New content is available; please refresh.');
            } else {
                console.log('Content is cached for offline use.');
            }
        }
    };
};

// Render the App component
ReactDOM.render(<App />, document.getElementById('root'));
