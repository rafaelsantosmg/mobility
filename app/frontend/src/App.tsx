import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react/jsx-runtime';
import Header from './components/Header';
import AppRoutes from './router';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Header />
      <AppRoutes />
    </Fragment>
  );
}

export default App;
