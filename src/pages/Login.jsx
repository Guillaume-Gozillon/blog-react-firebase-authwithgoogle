import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router'

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate()

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(result => {
      localStorage.setItem('isAuth', true)
      setIsAuth(true)
      navigate('/')
    })
  }

  return (
    <div className='loginPage'>
      <p>Sign In With Google to Conitnue</p>
      <button onClick={signInWithGoogle} className='login-with-google'>
        Sign in with Google
      </button>
    </div>
  )
}

export default Login
