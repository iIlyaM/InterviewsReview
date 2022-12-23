import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './style/main.css';
// // import App from './App';
// import reportWebVitals from './reportWebVitals';
// import {BrowserRouter} from "react-router-dom";
// // import {ToastContainer} from "react-toastify";
// import { UserContextProvider } from './context/UserContext';
// import "react-toastify/ReactToastify.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'semantic-ui-css/semantic.min.css';
// import './index.css';


// import { App } from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//   {/* <UserContextProvider> */}
//     <BrowserRouter>
//       {/* <ToastContainer /> */}
//       <App />
//     </BrowserRouter>
//     document.getElementById('app')
//   {/* </UserContextProvider> */}
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
