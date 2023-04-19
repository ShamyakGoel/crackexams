import { useRouter } from 'next/router'
import Link from 'next/link'
import {toast} from "react-toastify"
import {useEffect, useState} from 'react'
const Quizdones = () => {
    const router = useRouter()
    const [quizd, setQuizd] = useState(null)
    useEffect(() => {
        const fetchOrders = async ()=>{
          let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getquizdone`, {
            method: "POST",
            headers:{
              'Content-type': "application/json"
            },
            body :JSON.stringify({'email': JSON.parse(localStorage.getItem('user')).email})
          })
          let json = await res.json()
          setQuizd(json)
        }
        if(!localStorage.getItem('user')){
          router.push('/')
        }
        else{
          fetchOrders()
        }
      }, [])
      async function deletequizdone(id){
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deletequizdone`, {
          method: "POST",
          headers:{
            'Content-type': "application/json"
          },
          body :JSON.stringify({id:id})
        })
        toast.success("Quiz done has been deleted",{
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
  return (
    <div>
              <div className="container mx-auto">
        <div className="items">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <h1 className="text-2xl font-semibold text-center p-8">My Orders</h1>

                  <table className="min-w-full">
                    <thead className="border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          <b>Quiz Id</b>
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          <b>Quiz Done At</b>
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          <b>Passed</b>
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          <b>Max Marks</b>
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          <b>Obtained Marks</b>
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          <b>Details</b>
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          <b>Delete</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizd && quizd.map((item)=>{
                        if(!item){
                          return
                        }
                        let i = 0;
                        let date = new Date(item.createdAt)
                        return <tr className="border-b" key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item._id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {date.toLocaleString('en-in', { minutes: 'numeric', hour12: true })}
                        </td>
                        <td className={`text-sm  ${item.correct.ques.length !== 0 ? 'text-green-600' : 'text-red-600'} font-bold px-6 py-4 whitespace-nowrap`}>
                          {item.correct.ques.length === 0 ? "No" : "Yes"}
                        </td>
                        <td className={`text-sm text-black font-bold px-6 py-4 whitespace-nowrap`}>
                          {item.maxmarks}
                        </td>
                        <td className={`text-sm ${item.correct.ques.length !== 0 ? 'text-green-600' : 'text-red-600'} font-medium px-6 py-4 whitespace-nowrap`}>
                          {item.marks}
                          
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <Link href={`/result/${item._id}`}><a className="text-blue-500 hover:text-blue-800">Details</a></Link>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <span id={item._id} onClick={()=>{deletequizdone(item._id)}}><a className="text-red-500 hover:text-red-800 cursor-pointer">Delete</a></span>
                        </td>
                      </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
    )
}
export default Quizdones