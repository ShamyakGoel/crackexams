import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillLock } from 'react-icons/ai';
import {useRouter} from 'next/router';
const Login = ({mfetchadmin}) => { 
  const router = useRouter()
  const [creds, setCreds] = React.useState({email:"", password:""})
  const onChange = (e)=>{
    setCreds({...creds, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    let json = await mfetchadmin('checkAdmin', 'post', creds)
    console.log(json)
    if(json.success){
      localStorage.setItem('loggedin', true)
      router.push('/admin/')
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center py-0 px-4 sm:px-6 lg:px-8">
      <ToastContainer
          position={process.env.NEXT_PUBLIC_TOAST_TYPE}
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/logo.webp"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">Sign in to admin</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="email"
                  value={creds.email}
                  onChange={onChange}
                  name="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={creds.password}
                  onChange={onChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <AiFillLock className="h-5 w-5 text-blue-500 group-hover:text-gray-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Login