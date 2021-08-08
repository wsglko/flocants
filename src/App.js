//import logo from './logo.svg';
//import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import HomePage from './components/HomePage';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const {isAuthenticated} = useAuth0();
  return (
    !isAuthenticated ? (
      <LoginButton />
    ) :
    isAuthenticated && (
    <BrowserRouter>
      <Route exact path="/" component={HomePage} />
    </BrowserRouter>
    )
  );
}

export default App;
