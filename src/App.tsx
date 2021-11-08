import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
// import NowWhat from './components/NowWhat';
import client from './client';
import createStore from './store';
import Dashboard from './Features/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const store = createStore();

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper>
          <Header />
          <Dashboard />
          <ToastContainer />
        </Wrapper>
      </MuiThemeProvider>
    </Provider>
  </ApolloProvider>
);

export default App;
