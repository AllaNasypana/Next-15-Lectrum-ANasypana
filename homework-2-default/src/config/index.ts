import { ToastOptions } from 'react-toastify';

export const toastOptions: ToastOptions = Object.freeze({
    position:        'top-right',
    autoClose:       5000,
    hideProgressBar: false,
    closeOnClick:    true,
    pauseOnHover:    true,
    draggable:       true,
    progress:        undefined,
});



export const URL_BASE_FOR_NEWS= 'https://jsonplaceholder.typicode.com/';
export const URL_BASE_FOR_PRODUCTS= 'https://fakestoreapi.com/';
export const NEWS_AMOUNT = 10;

