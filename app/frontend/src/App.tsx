import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react/jsx-runtime';
import AppRoutes from './router';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <AppRoutes />
    </Fragment>
  );
}

export default App;
