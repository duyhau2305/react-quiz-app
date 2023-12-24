import React from 'react';
import { useDispatch } from 'react-redux';

// slices
import { setUser } from '../../redux/app.slice';

function AuthGuard({ children }) {
  const dispatch = useDispatch();
  const access_token = window.localStorage.getItem('access_token');
  
  React.useEffect(() => {
    if(!access_token) {
      window.location.href = '/login';
      return;
    }
    fetch('http://localhost:3000/api/users/auth', {
      method: 'POST',
      headers: {
        'x-auth-token': access_token
      }
    })
    .then(res => res.json())
    .then(data => {
      if(!data.isSuccess) {
        window.location.href = '/login';
        window.localStorage.clear();
        return;
      }

      // set user
      dispatch(setUser(data.data.user))
    })

  },[access_token])


  return <>{children}</>
}

export default AuthGuard