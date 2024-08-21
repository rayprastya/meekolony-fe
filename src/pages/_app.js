import '../app/globals.css';
import Navbar from '../components/Navbar';
import useWebSocket from '../hooks/useWebSocket';
import Notification from '../components/Notification';

function MyApp({ Component, pageProps }) {
  const message = useWebSocket('ws://localhost:8080');
  return (
    <>
      <Navbar />
      {message && <Notification message={message} />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
