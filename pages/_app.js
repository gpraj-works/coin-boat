import '../styles/globals.css';
import '../styles/custom.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider enableSystem={true} attribute='class'>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
