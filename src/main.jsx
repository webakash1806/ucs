import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './Redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      {/* <div className='relative bottom-0 right-0 z-[1556059550555]'>
        <ToastContainer position='bottom-left' autoClose={1500} />
      </div> */}
    </BrowserRouter>
  </Provider>
)