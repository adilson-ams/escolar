import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastProvider } from 'react-toast-notifications'

// Grid Dev Express
import 'devextreme/dist/css/dx.common.css';
// import 'devextreme/dist/css/dx.light.css';
import './styles/devextreme-custom.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

ReactDOM.render(
  <React.Fragment>
    <ToastProvider autoDismiss={true} autoDismissTimeout={5000} >
      <App />
    </ToastProvider>
  </React.Fragment>,
  document.getElementById('root')
);
