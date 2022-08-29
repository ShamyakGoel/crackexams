import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Quiz from '../../models/Quiz'
const Addques = ({ mfetchadmin, dropdown }) => {
    const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" })
    const [creds, setCreds] = useState({ question: '', qslug: '1', hint: '', options: options, correctOption: '' })
    const onChange = async (e) => {
        if (e.target.name == "a" || e.target.name == "b" || e.target.name == "c" || e.target.name == "d") {
            setOptions({ ...options, [e.target.name]: e.target.value })
            setCreds({ ...creds, ['options']: options })
            return
        }
        setCreds({ ...creds, [e.target.name]: e.target.value, 'options': options })
    }
    const qOnchange = async (e) => {
        setCreds({...creds, 'qslug': qslug()})
    }
    function empty() {
        if (!creds.question || qslug() == "1" || !options.a || !options.b || !options.c || !options.d || !creds.correctOption) {
            return true;
        }
        else {
            return false
        }
    }
    function qslug(){
        let select = document.getElementById("qslug")
        return select.value
    }
    async function handleSubmit(e) {
        e.preventDefault()
        setCreds({ ...creds, ['options']: options })
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
        else {
            let json = await mfetchadmin('addquestion', "POST", creds);
            if (!json.success) {
                return toast.error(json.error, {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else{
                return toast.success('Question added successfully', {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    }
    return <div className='min-h-screen'>
        <h1 className='text-3xl text-center font-bold my-4'>Welcome to Crackexams admin panel!</h1>
        <h3 className='text-2xl text-center font-bold my-4'>Add a question</h3>
        <div className="px-2 w-full" >
            <div className=" mb-4">
                <label htmlFor="address" className="leading-7 text-sm text-gray-600">Question</label>
                <textarea onChange={onChange} value={creds.question} type="text" minLength={10} maxLength={1000} id="question" name="question" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
        </div>
        <div className='mx-auto flex'>

            <div className="px-2 w-1/2" >
                <div className=" mb-4">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Quiz slug</label>
                    <select id="qslug" onChange={qOnchange} value={creds.qslug} name="qslug" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option value="1">Choose a option</option>
                        {dropdown.map((elem)=>{
                            return <option key={elem.slug} value={elem.slug}>{elem.title}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="px-2 w-1/2" >
                <div className=" mb-4">
                    <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Hint</label>
                    <input onChange={onChange} value={creds.hint} type="text" id="hint" name="hint" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
        </div>
        <h3 className='text-3xl font-bold font-mono text-center'>Options</h3>
        <div className='mx-auto flex'>
            <div className="px-2 w-1/2" >
                <div className="relative mb-6">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <p>a</p>
                    </div>
                    <input onChange={onChange} value={options.a} type="text" id="a" name='a' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
            </div>
            <div className="px-2 w-1/2" >
                <div className="relative mb-6">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <p>b</p>
                    </div>
                    <input onChange={onChange} value={options.b} type="text" id="b" name='b' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
            </div>
        </div>
        <div className='mx-auto flex'>
            <div className="px-2 w-1/2" >
                <div className="relative mb-6">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <p>c</p>
                    </div>
                    <input onChange={onChange} value={options.c} type="text" id="c" name='c' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
            </div>
            <div className="px-2 w-1/2" >
                <div className="relative mb-6">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <p>d</p>
                    </div>
                    <input onChange={onChange} value={options.d} type="text" id="d" name='d' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
            </div>
        </div>
        <div className="px-2 w-full" >
            <div className=" mb-4">
                <label htmlFor="correctOption" className="leading-7 text-sm text-gray-600">Correct option</label>
                <input onChange={onChange} value={creds.correctOption} type="correctOption" maxLength={1} minLength={1} id="correctOption" name="correctOption" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
        </div>
        <div className='text-center'>
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add a question
            </button>
        </div>
    </div>
}

export async function getServerSideProps(context) {
    let all = await Quiz.find();
    let dropdown = [{}]
    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        dropdown.push({title: element.title, slug: element.slug})
    }
    for (var i = 0; i < dropdown.length; i++) {
        if (!dropdown[i].title) {
            var spliced = dropdown.splice(i, 1);
        }
    }
    return {
        props: { dropdown: JSON.parse(JSON.stringify(dropdown)) }, // will be passed to the page component as props
    }
}

export default Addques