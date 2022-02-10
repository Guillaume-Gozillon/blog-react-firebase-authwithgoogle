import { Outlet, Navigate } from 'react-router'

const PrivateRoute = ({ isAuth }) => {
  if (!isAuth) {
    return <Navigate to='/' />
  }
  return (
    <div className='container'>
      <Outlet />
    </div>
  )
}

export default PrivateRoute
