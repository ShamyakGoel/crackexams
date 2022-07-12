import {useEffect} from 'react'
import Question from "../../models/Question"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router"
const MyQuiz = ({ question, last, totalques, addAnswerCorrect, addAnswerWrong, retrieve, ans }) => {
  useEffect(()=>{
    retrieve()
  }, [])
  async function handleSubmit() {
    let options = document.getElementsByName('options');
    let option_value;
    for (let i = 0; i < options.length; i++) {
      if (options[i].checked) {
        let label = document.getElementById('l' + options[i].id)
        option_value = label.innerText;
      }
    }
    if (option_value === undefined) {
      return toast.error(`Please select a option`, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      if(last){
        if(question.options[question.correctOption] === option_value){
          addAnswerCorrect(question._id, option_value)
        }
        else if(question.options[question.correctOption] !== option_value){
          addAnswerWrong(question._id, option_value)
        }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkQuiz`, {
          method: "POST",
          headers: {
            'Content-type': "application/json"
          },
          body: JSON.stringify({ans, qslug: router.query.quiz})
        })
        let json = await res.json()
        console.log(json)
        router.push(`${process.env.NEXT_PUBLIC_HOST}/result/${json.quizdone._id}`)
      }
      else if(question.options[question.correctOption] === option_value){
        addAnswerCorrect(question._id, option_value)
        router.push(`${process.env.NEXT_PUBLIC_HOST}/quiz/${router.query.quiz}?question=${Number(router.query.question)+1}`)
      }
      else if(question.options[question.correctOption] !== option_value){
        addAnswerWrong(question._id, option_value)
        router.push(`${process.env.NEXT_PUBLIC_HOST}/quiz/${router.query.quiz}?question=${Number(router.query.question)+1}`)
      }
      
    }
  }
  const router = useRouter()
  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <div className="container md:m-20 m-10 md:mx-16 mx-0   bg-slate-200 rounded-xl px-3 py-3">
        <h1 className="px-5 text-2xl py-1 bg-green-600 rounded-xl text-white w-full">Question {router.query.question} of {totalques}</h1>
        <h2 className="px-5 text-xl my-2 bg-blue-600 rounded-xl text-white w-full">Ques {router.query.question}. {question.question}</h2>
        <div className="options text-lg">
          <div className="flex justify-right  rounded-full px-10 font-semibold">
            <div>
              <div className="form-check">
                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="options" id="options1" />
                <label className="form-check-label inline-block text-gray-800" htmlFor="options1" id="loptions1">
                  {question.options.a}
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="options" id="options2" />
                <label className="form-check-label inline-block text-gray-800" htmlFor="options2" id="loptions2">
                  {question.options.b}
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="options" id="options3" />
                <label className="form-check-label inline-block text-gray-800" htmlFor="options3" id="loptions3">
                  {question.options.c}
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="options" id="options4" />
                <label className="form-check-label inline-block text-gray-800" htmlFor="options4" id="loptions4">
                  {question.options.d}
                </label>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8 my-3">
          Submit your answer
        </button>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  let questions = await Question.find({ qslug: context.query.quiz })
  if (questions.length === Number(context.query.question)) {
    return {
      props: { question: JSON.parse(JSON.stringify(Array.from(questions)[Number(context.query.question) - 1])), last: true, totalques: questions.length },
    }
  }
  else {
    return {
      props: { question: JSON.parse(JSON.stringify(Array.from(questions)[Number(context.query.question) - 1])), last: false, totalques: questions.length },
    }
  }
}

export default MyQuiz