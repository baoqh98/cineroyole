import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Pages/Layout';
import AuthPage from './Modules/Authentication/Pages/AuthPage';

// import Home from './Modules/Home/Pages/Home';
// import Movie from './Modules/Movie/Pages/Movie';
// import Purchase from './Modules/Purchase/Pages/Purchase';
// import Login from './Modules/Authentication/Components/Login';
// import Register from './Modules/Authentication/Components/Register';
// import Page404 from './UI/404/Pages/Page404';

const Home = React.lazy(() => import('./Modules/Home/Pages/Home'));
const Movie = React.lazy(() => import('./Modules/Movie/Pages/Movie'));
const Purchase = React.lazy(() => import('./Modules/Purchase/Pages/Purchase'));
const Login = React.lazy(
  () => import('./Modules/Authentication/Components/Login')
);
const Register = React.lazy(
  () => import('./Modules/Authentication/Components/Register')
);
const Page404 = React.lazy(() => import('./UI/404/Pages/Page404'));

function App() {
  return (
    <div className='App'>
      <Suspense>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/purchase/:showtimeId' element={<Purchase />} />
          </Route>
          <Route path='/movie/:movieId' element={<Movie />} />

          <Route path='/auth' element={<AuthPage />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
