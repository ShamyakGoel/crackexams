import { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import A from '../../components/A';
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link"
import { useRouter } from "next/router"
const Index = ({mfetchadmin}) => {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('loggedin') !== 'true') {
      router.push('/admin/login')
    }
  }, [])
  const [creds, setCreds] = useState({ title: '', desc: '', questions: 0, category: '', img: 'https://media.istockphoto.com/photos/quiz-time-concept-speech-bubble-with-pencil-on-yellow-background-picture-id1268465415?k=20&m=1268465415&s=612x612&w=0&h=dzRhC8EPw1bZTIDzxc0416FaL8IF71RCPNjBlYUgzQA=', slug: '', maxmarks: 0, isMock: true, examName: "" , maxTime: 0})
  const onChange = async (e) => {
    if (e.target.name === "isMock") {
      return setCreds({ ...creds, [e.target.name]: e.target.checked })
    }
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }
  function empty() {
    if (!creds.title || !creds.desc || !creds.category || !creds.img || !creds.slug || !creds.maxmarks ||!creds.examName ||!creds.maxTime) {
      return true;
    }
    else {
      return false
    }
  }
  async function handleSubmit(e) {
    e.preventDefault()
    if (empty()) {
      return toast.error('Please provide valid details.', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if (localStorage.getItem("slug") == creds.slug) {
      return toast.error('Please make slug unique.', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      let json = await mfetchadmin('addquiz', "POST", creds);

    }
  }
  return <div className='min-h-screen'>
    <h1 className='text-3xl text-center font-bold my-4'>Welcome to Crackexams admin panel!</h1>
    <h3 className='text-2xl text-center font-bold my-4'>Add a quiz</h3>
    <div className='mx-auto flex'>

      <div className="px-2 w-1/2" >
        <div className=" mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Title</label>
          <input onChange={onChange} value={creds.title} type="title" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className="px-2 w-1/2" >
        <div className=" mb-4">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Questions</label>
          <input onChange={onChange} value={creds.questions} type="number" id="questions" disabled name="questions" className="disabled:bg-gray-200 w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
    </div>
    <div className="px-2 w-full" >
      <div className=" mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Description</label>
        <textarea onChange={onChange} value={creds.desc} type="desc" id="desc" name="desc" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
    </div>
    <div className="px-2 w-full" >
      <div className=" mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Category</label>
        <input onChange={onChange} value={creds.category} type="category" id="category" name="category" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
    </div>
    <div className='mx-auto flex'>

      <div className="px-2 w-1/2" >
        <div className=" mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Image url</label>
          <input onChange={onChange} value={creds.img} type="text" id="img" name="img" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className="px-2 w-1/2" >
        <div className=" mb-4">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Slug</label>
          <input onChange={onChange} value={creds.slug} type="text" id="slug" name="slug" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
    </div>
    <div className='mx-auto flex'>

      <div className="px-2 w-1/2" >
        <div className=" mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Max Marks</label>
          <input onChange={onChange} value={creds.maxmarks} type="number" id="maxmarks" name="maxmarks" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className="px-2 w-1/2" >
        <div className="flex items-center mb-4">
          <input id="default-checkbox" type="checkbox" name="isMock" onChange={onChange} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Mock?</label>
        </div>
      </div>
    </div>
    <div className='mx-auto flex'>
    <div className="px-2 w-1/2" >
      <div className=" mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Exam Name</label>
        <input onChange={onChange} value={creds.examName} type="text" id="examName" name="examName" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      </div>
      <div className="px-2 w-1/2">
        <div className=' mb-4'>
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Max Time (In Seconds)</label>
        <input onChange={onChange} value={creds.maxTime} type="number" id="maxTime" name="maxTime" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      </div>
      </div>
    <div className='text-center'>
    <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Add a quiz
</button>
</div>
  </div>
}

export default Index