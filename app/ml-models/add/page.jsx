'use client';
import React, { useState, useRef } from "react";

const AddModel = () => {
    const [modelName, setModelName] = useState("");
    const [modelUrl, setModelUrl] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [accuracy, setAccuracy] = useState("");
    const [precision, setPrecision] = useState("");
    const [recall, setRecall] = useState("");
    const [trainingDataUrl, setTrainingDataUrl] = useState("");
    const [dockerImageUrl, setDockerImageUrl] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [ModelPost, setModelPost] = useState({
        modelName: '',
        modelUrl: '',
        modelDescription:'',
        category:'',
    });

    const addAccuracy = (num) => {
        if (typeof num !== "number" || isNaN(num) || num > 1) {
            setAccuracy(0);
        } else {
            setAccuracy(num);
        }
    };

    const addRecall = (num) => {
        if (typeof num !== "number" || isNaN(num) || num > 1) {
            setRecall(0);
        } else {
            setRecall(num);
        }
    };

    const addPrecision = (num) => {
        if (typeof num !== "number" || isNaN(num) || num > 1) {
            setPrecision(0);
        } else {
            setPrecision(num);
        }
    };

    const fileInputRef = useRef(null);
    const handleClick = () => {
        // 👇️ open file input box on click of another element
        fileInputRef.current.click();
    };
    const progressCallback = (progressData) => {
        let percentageDone =
            100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        //console.log(percentageDone);
    };
    const uploadFile = async(e) =>{
        // Push file to lighthouse node
        // Both file and folder are supported by upload function
        // console.log('Upload Start:');
        // const output = await lighthouse.upload(e, process.env.NEXT_PUBLIC_LIGHTHOUSE_SDK_KEY, progressCallback);
        // console.log('File Status:', output);
        // /*
        //   output:
        //     data: {
        //       Name: "filename.txt",
        //       Size: 88000,
        //       Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        //     }
        //   Note: Hash in response is CID.
        // */

        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    }

    return (
        <div className='w-full max-w-full flex-start flex-col'>
            <h3 className='head_text text-left'>
                <span className='blue_gradient'>Add Model</span>
            </h3>
            <div className="flex flex-col glassmorphism mt-5 w-[60%]">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex w-full flex-col ">

                        <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Add Model Url</label>
                        <input
                            value={modelUrl}
                            type={"url"}

                            onChange={(e) => setModelUrl(e.target.value)}
                            placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                            className="w-[90%] text-white placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                        />

                        <div className="flex flex-col mt-5  lg:flex-row">
                            <div className="flex lg:w-3/4 flex-col ">
                                <label className='font-satoshi font-semibold text-base text-gray-700'>Model Name</label>
                                <input
                                    value={modelName}
                                    onChange={(e) => setModelName(e.target.value)}
                                    placeholder="Text to image generative Model"
                                    className="w-[60%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                                />
                            </div>

                        </div>
                        <div className="flex flex-row">

                            <div className="flex flex-col">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>What this model can do</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full text-gray-400 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"
                                >
                                    <option>Text to image generation</option>
                                    <option>Text classification</option>
                                    <option>Audio processing</option>
                                    <option>Activity detection</option>
                                    <option>Text to text generation</option>
                                    <option>Voice recognition</option>
                                    <option>Image classification</option>
                                    <option>Question & Answer</option>
                                    <option>Visual Question & Answer</option>


                                    <option>Video classification</option>
                                </select>
                            </div>
                            <div className="flex flex-col mx-5">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Model Licence</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-[90%] text-gray-400 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"
                                >
                                    <option>MIT LICENSE</option>
                                    <option>GNU GENERAL PUBLIC LICENSE</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <label className="text-white mt-5">Describe the model</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody."
                            className="w-[90%] text-white h-32 placeholder:text-gray-400  rounded-md mt-2 p-2 border   border-[#bfcfdc] focus:outline-none"

                        />
                        <div className="flex flex-row">
                            <div className="flex flex-col  w-full">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Url for current training data</label>
                                <input
                                    value={trainingDataUrl}
                                    type={"url"}
                                    onChange={(e) => setTrainingDataUrl(e.target.value)}
                                    placeholder="https://github.com"
                                    className="w-[40%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                                />
                            </div>

                            <div className="flex items-center justify-end">
                                <input          style={{display: 'none'}}
                                                ref={fileInputRef}
                                                onChange={e=>uploadFile(e)} type="file" />
                                <button
                                    onClick={handleClick}
                                    className='py-2 px-6 text-sm bg-orange-500 hover:bg-orange-400 rounded-md text-white'                                >
                                    {/*<BiUpload />*/}
                                    <p > Model file</p>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row mt-5 w-full  justify-between">

                            <div className="flex flex-col ">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Accuracy</label>
                                <input
                                    value={accuracy === 0 ? "" : accuracy}
                                    step={0.01}
                                    onChange={(e) => addAccuracy(parseFloat(e.target.value))}
                                    type={"number"}
                                    placeholder="1.0"

                                    className="w-[40%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Precision</label>
                                <input
                                    value={precision === 0 ? "" : precision}
                                    step={0.01}
                                    onChange={(e) => addPrecision(parseFloat(e.target.value))}
                                    type={"number"}
                                    placeholder="1.0"
                                    className="w-[40%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col  ">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Recall</label>
                                <input
                                    value={recall === 0 ? "" : recall}
                                    step={0.01}
                                    onChange={(e) => addRecall(parseFloat(e.target.value))}                                    type={"number"}
                                    placeholder="1.0"
                                    className="w-[40%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"
                                />
                            </div>

                        </div>
                        <div className="flex flex-row mt-5 w-full  ">

                            <div className="flex flex-col mt-5 w-full">



                                    <div className="flex-1 flex-row">
                                        <input
                                            className="text-[#9CA3AF] text-sm"
                                            type="checkbox"
                                            name="checkall"


                                            onChange={handleClick}
                                        />
                                        <label className='font-satoshi font-semibold text-base text-gray-700 mx-5 items-start'>Save the uniqueness of the model(Mint a NFT)</label>

                                    </div>

                                <div className="flex flex-row  mt-5 ">
                                    <input
                                        className="text-[#9CA3AF] text-sm"
                                        type="checkbox"
                                        name="checkall"


                                        onChange={handleClick}
                                    />
                                    <label className='font-satoshi font-semibold text-base text-gray-700 mx-auto'>Deploy this model and make it accessible via endpoint for others to use.</label>

                                </div>

                                    {/*<div className="flex flex-row mt-5  ">*/}
                                    {/*    <input*/}
                                    {/*        className="text-[#9CA3AF] text-sm"*/}
                                    {/*        type="checkbox"*/}
                                    {/*        name="checkall"*/}


                                    {/*        onChange={handleClick}*/}
                                    {/*    />*/}
                                    {/*    <label className='font-satoshi font-semibold text-base text-gray-700 mx-auto'>I would like to deploy this model and make it accessible via endpoint for others to use.</label>*/}

                                    {/*</div>*/}
                                <div className="flex flex-row mt-5  ">
                                    <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Url to the docker image</label>
                                    <input
                                        value={dockerImageUrl}
                                        type={"url"}
                                        onChange={(e) => setDockerImageUrl(e.target.value)}
                                        placeholder="https://github.com"
                                        className="text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                                    />
                                </div>




                            </div>
                            <div className="flex flex-col w-2/5   ">

                            </div>
                        </div>

                    </div>
                </div>

                <div className='flex-end mt-5 mb-5 gap-4'>
                    <button className="bg-transparent text-gray-400 py-2 px-6 border rounded-md  border-[#bfcfdc]  mr-6">
                        Discard
                    </button>
                    <button
                        onClick={ () => {}}
                        className='py-2 px-6 text-sm bg-primary-orange rounded-md text-white'
                    >
                        {/*<BiSave />*/}
                        <p className="ml-2">Publish Proposal</p>
                    </button>


                </div>

            </div>

        </div>
    );
}

export default AddModel