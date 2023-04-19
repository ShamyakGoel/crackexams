import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
// import { useRouter } from "next/router";
import { MdAccountCircle} from "react-icons/md";
const Navbar = () => {
  const [showProfile, setshowProfile] = React.useState(false);
  return (
    <>
      <div>
      {showProfile && <div className='z-20 absolute right-14 rounded-md px-5 w-32 bg-white dark:bg-gray-800 dark:text-white shadow-lg border py-4 top-12' onMouseOver={() => { setshowProfile(true) }} onMouseLeave={() => { setshowProfile(false) }}>
          <ul>
            <Link href={'/orders'}><li className="py-1 hover:text-gray-700 cursor-pointer text-sm ">Orders</li></Link>
            <li className="py-1 hover:text-gray-700 cursor-pointer text-sm ">Logout</li>
            <Link href={'/profile'}><li className="py-1 hover:text-gray-700 cursor-pointer text-sm ">My Account</li></Link>
          </ul>
        </div>}
        
      </div>
      <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-gray-800 text-white dark:bg-gray-700 dark:text-white z-10`}>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <div className="logo mr-auto md:mx-5 ml-2">
          <Link href={"/"}>
            
              <img src="/logo.webp" alt="" className="rounded-lg bg-white" width={150} />
            
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items space-x-6 font-bold md:text-md">
            <Link href={"/exams"} className="hover:text-gray-400">
              
                <li>Exams</li>
              
            </Link>
            <Link href={"/mocks"} className="hover:text-gray-400">
              
                <li>Mocks</li>
              
            </Link>
            <Link href={"/quizzes"} className="hover:text-gray-400">
              
                <li>Quiz</li>
              
            </Link>
            <Link href={"/mugs"} className="hover:text-gray-400">
              
                <li>Mugs</li>
              
            </Link>
          </ul>
        </div>
        <div className="absolute right-0 mx-5 top-4 flex cart space-x-6 items-center">
          <span onMouseOver={() => { setshowProfile(true) }}><MdAccountCircle className="text-xl md:text-2xl lg:text-3xl cursor-pointer mx-2" /></span>
          <Link href={'/login'}>
            <button className="bg-blue-500 px-2 py-1 rounded-md mx-2 text-sm text-white">Login</button>
          </Link> 
        </div>
      </div>
    </>
  );
};

export default Navbar;
