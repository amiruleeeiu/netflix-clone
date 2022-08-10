import React from 'react';
import Navbar from './componets/Navbar';
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { AuthContextProvider } from './Context/AuthContext';
import Account from './pages/Account';
import MovieList from './pages/MovieList';

function App() {

  return (
    <>
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/movies/:title' element={<MovieList/>}/>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
