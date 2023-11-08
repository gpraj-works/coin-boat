import '@/styles/globals.css';
import '@/styles/custom.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import store from 'providers/store';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<ThemeProvider enableSystem={true} attribute='class'>
				<Component {...pageProps} />
				<ToastContainer autoClose={1500} position='bottom-right' limit={3} />
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
