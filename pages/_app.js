import '../styles/globals.css'
import {useState, useEffect} from "react"
import Navbar from '../components/Navbar'
import {useRouter} from 'next/router'
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
 
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')))
    }else{
      setUser(null)
    }
  }, [router.pathname])
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

      copy.correct.ques.push(qid)
      copy.correct.soption[qid] = soption
    }
    else{
      copy.correct = {ques: [], soption: {}}
      copy.correct.ques.push(qid)
      copy.correct.soption[qid] = soption
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
    }
    else{
      copy.wrong = {ques: [], soption: {}}
      copy.wrong.ques.push(qid)
      copy.wrong.soption[qid] = soption
    }
    if(!copy.correct){
      copy.correct = {ques: [], soption: {}}
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
  async function mfetch(endpoint, requesttype, body, datatype='json'){
    if(datatype === 'json'){
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/${endpoint}`, 
      {
        method:requesttype.toUpperCase(),
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      let json = await res.json()
      return json
    }
    else{
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/${endpoint}`, 
      {
        method:requesttype.toUpperCase(),
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      let json = await res.text()
      return json
    }
  }
  async function mfetchadmin(endpoint, requesttype, body, datatype='json'){
    /**
     * Function mfetchadmin is used for making requests to ADMIN endpoints
     * @param {String} endpoint is endpoint for request
     * @param {String} requesttype is the type of request such as:- 'get', 'post'
     * @param {String} body is the data to be sent
     * @param {String} datatype is the type of response to be returned
     */
    if(datatype === 'json'){
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/${endpoint}`, 
      {
        method:requesttype.toUpperCase(),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'process.env.NEXT_PUBLIC_TOKEN_ADMIN'
        },
        body: JSON.stringify(body)
      })
      let json = await res.json()
      return json
    }
    else{
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/${endpoint}`, 
      {
        method:requesttype.toUpperCase(),
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      let json = await res.text()
      return json
    }
  }
  if(router.pathname === '/admin/gpdf/[id]'){
  return <><Component {...pageProps} className="min-h-screen" /></>
  }else{
    return <><Navbar user={user}/><Component ans={ans} user={user} mfetch={mfetch} mfetchadmin={mfetchadmin} retrieve={retrieve} addAnswerCorrect={addAnswerCorrect} addAnswerWrong={addAnswerWrong} {...pageProps} className="min-h-screen" /></>
  }
}

export default MyApp
