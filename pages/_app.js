import '../public/css/main.css'
import { HelmetProvider, Helmet } from 'react-helmet-async';

const helmetContext = {};

function MyApp({ Component, pageProps }) {
  return (
    <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Toggle Scheduler!</title>
          <meta charSet="utf-8" />
          <meta name='description' content='Simple scheduler.' />
        </Helmet>
        <Component {...pageProps} />
    </HelmetProvider>
  )
}

export default MyApp
