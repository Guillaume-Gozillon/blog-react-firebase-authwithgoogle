import './App.css'
import { useState } from 'react'
import { signOut } from '@firebase/auth'
import { auth } from './firebase-config'
import Home from './pages/Home'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import CreatePost from './pages/CreatePost'
import PrivateRoute from './PrivateRoute'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/login'
    })
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to='/'>Home</Link>
        {!isAuth ? (
          <Link to='/login'>Login</Link>
        ) : (
          <>
            <Link to='/private/createpost'>Create Post</Link>
            <button onClick={signUserOut}>LogOut</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />
        <Route path='/private' element={<PrivateRoute isAuth={isAuth} />}>
          <Route path='/private/createpost' element={<CreatePost />} />
        </Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
