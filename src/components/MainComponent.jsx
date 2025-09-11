import React from 'react'
import { useRef, useState, useEffect } from 'react'

const MainComponent = () => {
    const ref = useRef()
    const [passArray, setpassArray] = useState([])
    const [form, setform] = useState({ site: "", username: "", password: "" })

    useEffect(() => {
        const pwds = localStorage.getItem("passwords")
        if (pwds) {
            setpassArray(JSON.parse(pwds))
        }
    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showPassword = () => {
        alert("Password is 12345")
        if (ref.current.src.includes("icons/passDisable.png")) {
            ref.current.src = "icons/passVisible.png"
        } else {
            ref.current.src = "icons/passDisable.png"
        }

    }

    const savePwd = () => {
        setpassArray([...passArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passArray, form]))
        setform({site:"",username:"",password:""})
        console.log([...passArray, form])
    }

    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(144,238,144,0.5)_100%)]"></div>
            <div className="h-[90vh] flex flex-col gap-6 container max-w-5xl mx-auto px-15 py-3 text-white bg-black pt-10 overflow-y-hidden">
                <div className="logo font-bold text-2xl text-center ">
                    <span className="text-green-700 ">&lt;</span>
                    <span className='text-white'>Rem</span>
                    <span className='text-green-700'>ME/&gt;</span>
                </div>
                <input name='site' onChange={handleChange} value={form.site} type=" text" placeholder='Enter your website URL' className='border-1 border-green-400 rounded-full py-1 px-3 w-full' />
                <div className="name-pwd flex gap-5 relative">
                    <input name='username' onChange={handleChange} value={form.username} type=" text" placeholder='Enter your Username' className='border-1 border-green-400 rounded-full py-1 px-3 w-full' />
                    <input name='password' onChange={handleChange} value={form.password} type=" text" placeholder='Enter your password' className='border-1 border-green-400 rounded-full py-1 px-3 w-full' />
                    <span onClick={showPassword} className='absolute right-0  cursor-pointer '><img ref={ref} className='invert w-7 pr-2 pt-1' src="icons/passVisible.png" alt="" /></span>
                </div>
                <div className="save-btn w-full flex justify-between px-2">
                    <p className='text-lg font-bold border-2 border-green-900 rounded-full px-3 '>Hi..!! I Remember your credentials provide me...</p>
                    <button onClick={savePwd} className='bg-green-700 hover:bg-green-500 rounded-full w-1/7 py-1 font-bold text-black border-2 border-green-900 cursor-pointer'>Save</button>
                </div>
                <div className="passwords-table flex flex-col gap-6 overflow-y-auto">
                    <span className='text-xl font-bold'>Your passwords</span>
                    {passArray.length === 0 && <p className='text-center text-lg font-bold'>No passwords saved yet..!!</p>}
                    {passArray.length !=0 &&<table className='table-auto overflow-hidden rounded-md'>
                        <thead className='bg-green-700 text-white p-9'>
                            <tr>
                                <th className='py-2 text-lg font-bold'>Site-Name</th>
                                <th className='py-2 text-lg font-bold'>Username</th>
                                <th className='py-2 text-lg font-bold'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-400 text-black pb-20'>
                            {passArray.map((item)=>{
                                return (<tr className='text-center text-sm font-bold'>
                                <td className="py-2"><a href={item.site} target='_blank'>{ item.site}</a></td>
                                <td className="py-2">{item.username}</td>
                                <td className="py-2">{item.password}</td>
                            </tr>)
                            })}
                        </tbody>
                    </table>}
                </div>
                    
            </div>

        </>
    )
}

export default MainComponent
