import '../styles/globals.css'
import {useState} from "react"
import Navbar from '../components/Navbar'
function MyApp({ Component, pageProps }) {
  const [ans, setAns] = useState({})
  function addAnswerCorrect(qid, soption){  
    let copy = ans  
    if(!copy){
      copy = {}
    }
    if(copy.correct){
      if(copy.correct.ques.includes(qid)){
        return
      }
      console.log(copy)

      copy.correct.ques.push(qid)
      copy.correct.soption[qid] = soption
    }
    else{
      copy.correct = {ques: [], soption: {}}
      copy.correct.ques.push(qid)
      console.log(copy)
      copy.correct.soption[qid] = soption
      console.log(copy.correct)
    }
    setAns(copy)
    save()
  }
  function addAnswerWrong(qid, soption){  
    let copy = ans
    if(!copy){
      copy = {}
    }
    if(copy.wrong){
      if(copy.wrong.ques.includes(qid)){
        return
      }
      copy.wrong.ques.push(qid)
      copy.wrong.soption[qid] = soption
      console.log(copy)
    }
    else{
      copy.wrong = {ques: [], soption: {}}
      copy.wrong.ques.push(qid)
      copy.wrong.soption[qid] = soption
      console.log(copy)
    }
    setAns(copy)
    save()
  }
  function save(){
    localStorage.setItem('answers', JSON.stringify(ans))
  }
  function retrieve(){
    let copy = JSON.parse(localStorage.getItem('answers'))
    setAns(copy)
  }
  return <><Navbar/><Component ans={ans} save={save} retrieve={retrieve} addAnswerCorrect={addAnswerCorrect} addAnswerWrong={addAnswerWrong} {...pageProps} className="min-h-screen" /></>
}

export default MyApp
