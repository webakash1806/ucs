import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner'; // Import the correct component from sonner
import store from './Redux/store.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      {/* Place the Toaster component anywhere in your app */}
      {/* <div className='relative bottom-0 right-0 z-[155]'> */}
      <Toaster richColors position='bottom-right' toastOptions={{ duration: 1700 }} />
      {/* </div> */}
    </BrowserRouter>
  </Provider>
);
