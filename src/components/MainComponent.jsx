import React from 'react'

const MainComponent = () => {
    return (
        <>
            <div class="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(144,238,144,0.5)_100%)]"></div>
            <div className="flex flex-col gap-6 container max-w-5xl mx-auto px-15 py-3 text-white bg-black pt-10 ">
                <div className="logo font-bold text-2xl text-center ">
                    <span className="text-green-700 ">&lt;</span>
                    <span className='text-white'>Rem</span>
                    <span className='text-green-700'>ME/&gt;</span>
                </div>
                <input type=" text" placeholder='Enter your website URL' className='border-1 border-green-400 rounded-full py-1 px-3 w-full' />
                <div className="name-pwd flex gap-5">
                    <input type=" text" placeholder='Enter your Username' className='border-1 border-green-400 rounded-full py-1 px-3 w-full' />
                    <input type=" text" placeholder='Enter your password' className='border-1 border-green-400 rounded-full py-1 px-3 w-full' />
                </div>
                <div className="save-btn w-full flex justify-between px-2">
                <p className='text-lg font-bold border-2 border-green-900 rounded-full px-3 '>Hi..!! I Remember your credentials provide me...</p>
                <button className='bg-green-700 hover:bg-green-500 rounded-full w-1/7 py-1 font-bold text-black border-2 border-green-900'>Save</button>
                </div>

            </div>

        </>
    )
}

export default MainComponent
