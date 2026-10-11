import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

/** Browser root. Must render the same tree as src/entry-server.tsx. */
const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
