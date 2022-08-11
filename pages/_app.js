import { QuioscoProvider } from '../context/QuioscoProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  )
}

export default MyApp
