import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GlobalStyle } from './styles/GlobalStyle';
import Home from './pages/Home';
import Layout from './components/layout';
import Routes from './routes';
const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        {/* <Home /> */}
        <Routes />
      </Layout>
    </>
  )
}

export default App;
