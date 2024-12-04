import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from "./pages/Login2";
import Home from './pages/Home';
import Reports from './pages/Reports';
import Help from './pages/Help';
import ManageUsers from './pages/ManageUsers'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from "./pages/ErrorPage";
import { Provider } from 'react-redux'; 
import { store } from './store'; 

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Login /> },
      { path: 'Home', element: <Home /> },
      { path: 'Reports', element: <Reports /> },
      { path: 'help', element: <Help /> },
      { path: 'ManageUsers', element: <ManageUsers /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <Provider store={store}> 
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
