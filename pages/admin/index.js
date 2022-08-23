import {useEffect} from 'react'
import A from '../../components/A';
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router"
const Index = () => { 
    const router = useRouter()
    useEffect(() => {
        if(localStorage.getItem('loggedin') !== 'true'){
            router.push('/admin/login')
        }
    }, [])
    
    return <div className='min-h-screen'>
        <h1 className='text-3xl text-center font-bold my-4'>Welcome to Crackexams admin panel!</h1>
        <div>
            <ul className='list-decimal text-center'>
                <li>1. <A className='text-lg text-blue-600 hover:text-blue-900 font-mono text-bold' href='/quizzes' text='Go to Quizzes'/></li>
                <li>2. <A className='text-lg text-blue-600 hover:text-blue-900 font-mono text-bold' href='/mocks' text='Go to Mocks'/></li>
            </ul>
            <h2 className='text-2xl text-center font-bold my-4'>Admin panel links</h2>
            <ul className='list-decimal text-center'>
                <li>1. <A className='text-lg text-blue-600 hover:text-blue-900 font-mono text-bold' href='/admin/addquiz' text='Add a quiz'/></li>
                <li>2. <A className='text-lg text-blue-600 hover:text-blue-900 font-mono text-bold' href='/admin/addquestion' text='Add a question'/></li>
            </ul>
        </div>
    </div>
}

export default Index