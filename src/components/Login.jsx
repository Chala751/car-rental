import React from 'react'

const Login = ({setShowLogin}) => {
  return (
    <div onClick={()=>setShowLogin(false)} className=' fixed top-0 bottom-0 right-0 left-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>
      login form
    </div>
  )
}

export default Login
