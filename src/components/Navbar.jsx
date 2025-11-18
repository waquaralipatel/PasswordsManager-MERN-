import React from 'react'


const Navbar = () => {
    return (
        <nav className=' text-white bg-green-800 sticky top-0'>
            <div className="container max-w-5xl mx-auto pl-15 pr-5 py-3 items-center flex justify-between ">
                <div className="logo font-bold text-3xl">
                    <span className="text-black ">&lt;</span>
                    Rem
                    <span className='text-black'>ME/&gt;</span>
                </div>
                <li className='flex gap-5 font-bold text-lg'>
                    {/* <a className="cursor-pointer" href="/">Home</a>
                    <a className="cursor-pointer" href="/">About</a> */}
                    <a className="cursor-pointer bg-green-600 border-2 border-black hover:bg-green-400 rounded-full p-1 flex justify-between gap-1 items-center" href="/"><img className="w-7" src="icons/github.png" alt="" /><span className='text-black text-lg'>GitHub</span></a>
                </li>
            </div>
        </nav>
    )
}

export default Navbar
