import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

const MainComponent = () => {
    const ref = useRef()
    const passref = useRef()
    const [passArray, setpassArray] = useState([])
    const [form, setform] = useState({ site: "", username: "", password: "" })

    const getPasswords = async () => {
        const req = await fetch("http://localhost:3000/");
        const pwds = await req.json();   // ✅ ADD await here
        console.log(pwds);
        setpassArray(Array.isArray(pwds) ? pwds : []);
    };

    useEffect(() => {
        getPasswords();
    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copyText = (text) => {

        navigator.clipboard.writeText(text);
        toast.success("Successfully Copied! 📋");
    }
    const showPassword = () => {
        passref.current.type = passref.current.type === "password" ? "text" : "password"
        console.log(passref.current.type);

        if (ref.current.src.includes("icons/passDisable.png")) {
            ref.current.src = "icons/passVisible.png"
            passRef.current.type = "text"
        } else {
            ref.current.src = "icons/passDisable.png"
            passRef.current.type = "password"
        }

    }

    const savePwd = async () => {
        if (form.site.length > 0 && form.username.length > 0 && form.password.length > 0) {
            //if form if already exist delete del that id value 
            fetch("http://localhost:3000/", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: form.id }) });
             
            //save pwd
            setpassArray([...passArray, { ...form, id: uuidv4() }])
            let res = await fetch("http://localhost:3000/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) });
            console.log(res);

            setform({ site: "", username: "", password: "" })
            console.log([...passArray, form])
            toast.success("Credentials Saved!💾");
        } else {
            toast.error("Please fill all the fields!⚠️");
        }
    }
    const delPwd = async (id) => {
        let c = confirm("Are you sure you want to delete this password?")
        if (c) {
            console.log("delete pwd with id", id);
            setpassArray(passArray.filter((item) => item.id !== id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) });
            toast("Credentials Deleted!🗑️");

        }
    }
    const editPwd = (id) => {
        console.log("Editing pwd with id", id);

        const selected = passArray.find((item) => item.id === id);
        setform(selected);

        // keep it an ARRAY ✅
        setpassArray(passArray.filter((item) => item.id !== id));
    };


    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(144,238,144,0.5)_100%)]"></div>
            <div className="h-[88.1vh] flex flex-col gap-6 container max-w-5xl mx-auto md:px-15 py-3 text-white bg-black pt-10 md:overflow-y-hidden overflow-y-auto">
                <div className="logo font-bold text-2xl text-center ">
                    <span className="text-green-700 ">&lt;</span>
                    <span className='text-white'>Rem</span>
                    <span className='text-green-700'>ME/&gt;</span>
                </div>
                <input name='site' onChange={handleChange} value={form.site} type=" text" placeholder='Enter your website URL' className='border-1 border-green-700 rounded-full py-1 px-3 w-full' />
                <div className="name-pwd flex flex-col md:flex-row gap-5 relative">
                    <input name='username' onChange={handleChange} value={form.username} type=" text" placeholder='Enter your Username' className='border-1 border-green-900 rounded-full py-1 px-3 w-full' />
                    <input ref={passref} name='password' onChange={handleChange} value={form.password} type="password" placeholder='Enter your password' className='border-1 border-green-700 rounded-full py-1 px-3 w-full' />
                    <span onClick={showPassword} className='absolute right-0  cursor-pointer '><img ref={ref} className='invert w-7 pr-2 pt-1' src="icons/passVisible.png" alt="" /></span>
                </div>
                <div className="save-btn flex flex-col md:flex-row gap-5 items-center md:justify-between px-2">
                    <p className='md:text-lg w-full font-bold border-2 border-green-900 rounded-full px-3 text-[#808080]'>Hi..!! I Remember your credentials provide me...</p>
                    <button onClick={savePwd} className='bg-green-700 hover:bg-green-700 rounded-full md:w-1/7 w-full py-1 font-bold text-black border-2 border-green-900 cursor-pointer'>Save
                    </button>
                    <ToastContainer />

                </div>
                <div className="passwords-table md:overflow-y-auto">
                    {passArray.length === 0 && <p className='text-center text-lg font-bold'>No passwords saved yet..!!</p>}
                    {passArray.length != 0 && <table className='table-auto overflow-hidden rounded-md mb-15 w-full'>
                        <thead className='bg-green-700 text-black p-9'>
                            <tr>
                                <th className='py-2 text-md font-bold px-3'>Site-Name/URL</th>
                                <th className='py-2 text-md font-bold px-3'>Username</th>
                                <th className='py-2 text-md font-bold px-3'>Password</th>
                                <th className='py-2 text-md font-bold px-3'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-[#b6b1b0] text-black pb-20'>
                            {passArray.map((item) => {
                                return (<tr key={Math.random()} className='text-center text-sm font-bold'>
                                    <td className="py-2"><a href={item.site} target='_blank'>{item.site}</a></td>
                                    <td className="py-2 ">
                                        <div className="text-copy flex justify-center items-center gap-2">
                                            <span>{item.username}</span>
                                            <div className="copyText cursor-pointer"
                                                onClick={() => { copyText(item.username) }}>
                                                <span className="material-symbols-outlined hover:text-green-900">
                                                    content_copy
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 ">
                                        <div className="text-copy flex justify-center items-center gap-2">
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className="copyText cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                <span className="material-symbols-outlined hover:text-green-900">
                                                    content_copy
                                                </span>
                                                <ToastContainer />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 flex justify-center">
                                        <div className="del-edit flex gap-3 ">
                                            <div className="edit text-xl cursor-pointer hover:text-green-900"
                                                onClick={() => { editPwd(item.id) }}>
                                                <FaEdit />
                                            </div>
                                            <div className="del text-xl cursor-pointer hover:text-green-900"
                                                onClick={() => { delPwd(item.id) }}>
                                                <MdDeleteForever />
                                            </div>
                                        </div>
                                    </td>
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
