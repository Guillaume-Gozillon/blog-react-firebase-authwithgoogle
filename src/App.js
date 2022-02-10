import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import { useState } from 'react'
import { signOut } from '@firebase/auth'
import { auth } from './firebase-config'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/login'
    })
  }
  console.log(isAuth)
  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        {!isAuth ? (
          <Link to='/login'>Login</Link>
        ) : (
          <>
            <Link to='/createpost'>Create Post</Link>
            <button onClick={signUserOut}>LogOut</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />
        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
