'use client';
import {useState} from "react";

const EmailVerify = () => {
    const [code, setCode] = useState(null)
    return (
        <div className="w-full h-full flex flex-col items-center mt-[10%]">
            <div className="w-[40%] h-[80%] glassmorphism relative ">
                <div className="flex flex-col ">
                    <label className='font-satoshi font-semibold  text-base text-gray-700 mt-5'>Email</label>

                    <label className='font-satoshi text-base text-gray-700 mt-5'>john.smith@gmail.com</label>

                    <label className='font-satoshi font-semibold  text-base text-gray-700 mt-5'>Code</label>

                    <input
                        value={code}
                        type={"number"}

                        onChange={(e) => setCode(e.target.value)}
                        placeholder="123456"
                        className="text-white placeholder:text-gray-400 flex-center rounded-md mt-5 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                    />
                </div>

                <div className="flex-1 flex flex-col mt-10">
                    <div className="flex flex-row ">

                        <button
                            onClick={ () => {}}
                            className=" bg-orange-300 text-white-400 py-2 rounded-md flex px-4 flex-row items-center my-5"
                        >
                            {/*<BiHome />*/}
                            <p className="ml-2">Cancel</p>
                        </button>
                        <button
                            onClick={ () => {}}
                            className="bg-blue=500 bg-primary-orange text-white-400 py-2 rounded-md mx-5 my-5 flex px-4 justify-between flex-row items-center"
                        >
                            {/*<BiSave />*/}
                            <p className="ml-2">Submit</p>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default EmailVerify