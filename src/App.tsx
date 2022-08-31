import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './Modules/Authentication/Pages/AuthPage';

// import Home from './Modules/Home/Pages/Home';
// import Movie from './Modules/Movie/Pages/Movie';
// import Purchase from './Modules/Purchase/Pages/Purchase';
import Login from './Modules/Authentication/Components/Login';
import Register from './Modules/Authentication/Components/Register';

const Home = React.lazy(() => import('./Modules/Home/Pages/Home'));
const Movie = React.lazy(() => import('./Modules/Movie/Pages/Movie'));
const Purchase = React.lazy(() => import('./Modules/Purchase/Pages/Purchase'));
// const Login = React.lazy(
//   () => import('./Modules/Authentication/Components/Login')
// );
// const Register = React.lazy(
//   () => import('./Modules/Authentication/Components/Register')
// );

function App() {
  return (
    <div className='App'>
      <Suspense>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:movieId' element={<Movie />} />
          <Route path='/purchase/:showtimeId' element={<Purchase />} />

          <Route path='/auth' element={<AuthPage />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
