import React from 'react'

function GuestGuard({ children }) {
  const access_token = window.localStorage.getItem('access_token');

  if(access_token) {
    window.location.href = '/';
    return;
  }

  return <>{children}</>
}

export default GuestGuard