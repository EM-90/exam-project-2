import React from 'react'

function LoginForm({onRegisterClick}) {
    return (
    <div className='container mx-auto my-7 px-7 min-h-screen flex flex-col justify-center items-center '>
      <h2 className="text-5xl font-light mb-10">Login</h2>
      <form className='mb-40 w-1/2'>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
            autoComplete="current-password"
          />
        </div>
        <div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-skin-createBg text-skin-primary hover:text-white rounded-md hover:bg-skin-primary border-skin-primary"
        >
          Login
        </button>
        <button className="my-4 py-2" onClick={onRegisterClick}>Dont have an account? Create an account here</button>
      </form>
    </div>
  );
}




 


export default LoginForm
