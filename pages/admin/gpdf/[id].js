import QuizDone from '../../../models/QuizDone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function objToJson(obj) {
  return JSON.parse(JSON.stringify(obj))
}

const MyQuiz = ({ res }) => {
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
        <h1 className='text-4xl text-center my-3 text-gray-800 font-bold'>Your Quiz Summary</h1>
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
              <div className="container md:m-15 m-5 md:mx-16 mx-0 rounded-xl px-3">
                <h2 className="px-5 text-xl my-2 rounded-xl font-bold w-full">Ques {i + 1}. {elem.question}</h2>
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
              <div className="container md:m-15 m-10 md:mx-16 mx-0 rounded-xl px-3">
                <h2 className="px-5 text-xl my-2 rounded-xl font-bold w-full">Ques {i + 1}. {elem.question}</h2>
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
                        if(key === elem.correctOption){
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
        </div> : "" }
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