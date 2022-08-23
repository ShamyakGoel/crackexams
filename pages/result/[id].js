import QuizDone from '../../models/QuizDone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useRouter } from 'next/router'
function objToJson(obj) {
  return JSON.parse(JSON.stringify(obj))
}

const MyQuiz = ({ res }) => {
  const [name, setName] = useState("")
  console.log(res)
  async function getCertificate(e){
    e.preventDefault()
    if(res.correct.ques.length === 0){
      alert("Cannot genrate certificate. You don't pass in quiz")
      return
    }
    document.getElementById('hidden').href = `${process.env.NEXT_PUBLIC_HOST}/api/admin/genratecertificate?name=${name}&qname=${res.qname}&marks=${String(res.marks)}&maxmarks=${res.maxmarks}`
    document.getElementById('hidden').click()
  } 
  function onChange(e){
    setName(e.target.value)
  }
  const router = useRouter()
  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable={false}
      />
      <div>
<a href="" className='hidden' id="hidden"></a>
        <h1 className='text-4xl text-center my-3 text-gray-800 font-bold'>Your Quiz Summary</h1>
        <div className='text-center'>
        <a role="button" href={`${process.env.NEXT_PUBLIC_HOST}/api/admin/genratepdf?id=${router.query.id}`} class="bg-blue-600 hover:bg-grey text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
          <span>Download quiz summary as PDF</span>
        </a>
        <p className='font-bold text-xl text-center'>To get certificate enter your name</p>
        <form>
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={onChange} value={name} type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <button onClick={getCertificate} className="inline text-white bg-blue-500 border-0 py-1 px-2 focus:outline-none  hover:bg-blue-600 rounded text-lg w-full">Get your certificate</button>
        </form>
        </div>
        {res.correct.ques.length < 1 ? <div>
          <h2 className="text-4xl text-center my-3 text-red-800 font-bold">Oh no, you scored {res.marks} out of {res.maxmarks} Marks/Points</h2>
          <p className='font-bold text-xl text-center'>Do well next time after practising...</p>
        </div> : ""}
        {res.wrong.ques.length < 1 ? <div>
          <h2 className="text-4xl text-center my-3 text-green-800 font-bold">Wonderful!, you scored {res.marks} out of {res.maxmarks} Marks/Points</h2>
          <p className='font-bold text-xl text-center'>Congratulations for passing the examination!</p>
        </div> : ""}
        <p className='font-bold text-xl text-center'>Time Taken : {res.timeTaken} Minutes</p>
        {res.correct.ques.length > 0 ? <div className="correct">
          <h3 className='text-2xl text-green-800 font-extrabold text-center'>Your Correct Answers</h3>
          {res.correct.ques.map((elem, i) => {
            return <div key={elem._id}>
              <div className="container md:m-20 m-10 md:mx-16 mx-0   bg-slate-200 rounded-xl px-3 py-3">
                <h2 className="px-5 text-xl my-2 bg-blue-600 rounded-xl text-white w-full">Ques {i + 1}. {elem.question}</h2>
                <div className="options text-lg">
                  <div className="flex justify-right  rounded-full px-10 font-semibold">
                    <div>
                      {Object.keys(elem.options).map((key) => {
                        if (key === elem.correctOption && res.correct.soption[elem._id] === elem.options[elem.correctOption]) {
                          return <div className="form-check" key='key'>
                            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-800 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name={elem._id} id="options1" checked disabled />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="options1" id="loptions1">
                              {elem.options[elem.correctOption]} <span className='text-green-400 font-medium  '>Correct ✔</span>
                            </label>
                          </div>
                        }
                        return <div className="form-check" key={key}>
                          <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="options" id="options1" disabled />
                          <label className="form-check-label inline-block text-gray-800" htmlFor="options1" id="loptions1">
                            {elem.options[key]}
                          </label>
                        </div>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div> : ""}
        {res.wrong.ques.length > 0 ? <div className="wrong">
          <h3 className='text-2xl text-red-800 font-extrabold text-center'>Your Wrong Answers</h3>
          {res.wrong.ques.map((elem, i) => {
            return <div key={elem._id}>
              <div className="container md:m-20 m-10 md:mx-16 mx-0   bg-slate-200 rounded-xl px-3 py-3">
                <h2 className="px-5 text-xl my-2 bg-blue-600 rounded-xl text-white w-full">Ques {i + 1}. {elem.question}</h2>
                <div className="options text-lg">
                  <div className="flex justify-right  rounded-full px-10 font-semibold">
                    <div>
                      {Object.keys(elem.options).map((key) => {
                        if (res.wrong.soption[elem._id] === elem.options[key]) {
                          return <div className="form-check" key='key'>
                            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-800 checked:border-red-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="wop" id="options1" checked disabled />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="options1" id="loptions1">
                              <span>Your answer: </span><span className='font-extrabold'>{elem.options[key]}</span> <span className='text-red-600 font-medium'>Wrong ❌</span>
                            </label>
                          </div>
                        }
                        if (key === elem.correctOption) {
                          return <div className="form-check" key={key}>
                            <input className="form-check-input appearance-none rounded-full h-4 w-4 border bg-green-800 border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="wop" id="options1" checked disabled />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="options1" id="loptions1">
                              {elem.options[key]} <span className='text-green-400 font-medium'>Correct ✔</span>
                            </label>
                          </div>
                        }
                        return <div className="form-check" key={key}>
                          <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="wop" id="options1" disabled />
                          <label className="form-check-label inline-block text-gray-800" htmlFor="options1" id="loptions1">
                            {elem.options[key]}
                          </label>
                        </div>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div> : ""}
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  let quizdone = await QuizDone.findById(context.query.id)
  return {
    props: { res: objToJson(quizdone) }
  }
}

export default MyQuiz