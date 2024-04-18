import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/index.js';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading</div>} persistor={persistor}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENT_ID}>
                <App />
            </GoogleOAuthProvider>
        </PersistGate>
    </Provider>
);

{
    /* </React.StrictMode>, */
}
