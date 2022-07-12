import {useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router"
const Index = () => { 
    const router = useRouter()
    useEffect(() => {
        if(localStorage.getItem('loggedin') !== 'true'){
            router.push('/admin/login')
        }
    }, [])
    
    return <div>
        hi
    </div>
}

export default Index