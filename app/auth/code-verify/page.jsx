const EmailCodeVerify = () => {
    return (
        <div className="w-full h-screen bg-slate-800 flex flex-row">
            <div className="flex-1 flex flex-col">
                <div className="flex flex-row">
                    <div className="mt-5 ml-10 flex-1 justify-start">

                        <button
                            onClick={ () => {}}
                            className=" hover:bg-slate-700 text-white-400 py-2 rounded-md flex px-4 justify-between flex-row items-center"
                        >
                            {/*<BiHome />*/}
                            <p className="ml-2">Home</p>
                        </button>

                    </div>
                    <div className="mt-5 mr-10 flex justify-end">
                        <button className="bg-transparent text-pink-800 py-2 px-6 border rounded-md  border-[#bfcfdc]  mr-6">
                            Discard
                        </button>
                        <button
                            onClick={ () => {}}
                            className="bg-blue=500 hover:bg-slate-700 text-white-400 py-2 rounded-md flex px-4 justify-between flex-row items-center"
                        >
                            {/*<BiSave />*/}
                            <p className="ml-2">Publish Proposal</p>
                        </button>
                    </div>


                </div>
                <div className="flex flex-col m-10  mt-5  lg:flex-row">
                    <div className="flex lg:w-3/4 flex-col ">
                        <label className="text-[#9CA3AF]  text-sm">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                            className="w-[90%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border  bg-pink-100 border-[#bfcfdc] focus:outline-none"

                        />

                        <div className="flex flex-col w-2/5  mt-10 ">
                            <label className="text-[#9CA3AF]  text-sm">Proposal Type</label>
                            <select
                                value={proposalType}
                                onChange={(e) => setProposalType(e.target.value)}
                                className="w-[90%] text-gray-400 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border  bg-pink-100 border-[#bfcfdc] focus:outline-none"
                            >
                                <option>Dataset approval for training</option>
                                <option>Model Training</option>
                                <option>Model acceptance for deployment</option>
                                <option>Payouts</option>
                                <option>Other Administrative</option>
                            </select>
                        </div>
                        <label className="text-[#9CA3AF]  text-sm mt-10">Add dataset Url</label>
                        <input
                            value={dataSetUrl}
                            type={"url"}

                            onChange={(e) => setDataSetUrl(e.target.value)}
                            placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                            className="w-[90%] text-white placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border  bg-pink-100 border-[#bfcfdc] focus:outline-none"

                        />

                        <div className="flex flex-col mt-5  lg:flex-row">
                            <div className="flex lg:w-3/4 flex-col ">
                                <label className="text-[#9CA3AF]  text-sm">dataset Name</label>
                                <input
                                    value={datasetName}
                                    onChange={(e) => setdatasetName(e.target.value)}
                                    placeholder="Text to image generative dataset"
                                    className="w-[40%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border  bg-pink-100 border-[#bfcfdc] focus:outline-none"

                                />
                            </div>
                            <div className="flex flex-col mt-5  flex-row">
                                <input          style={{display: 'none'}}
                                                ref={fileInputRef}
                                                onChange={e=>uploadFile(e)} type="file" />
                                <button
                                    onClick={handleClick}
                                    className=" hover:bg-slate-700 text-[#9CA3AF] py-2 rounded-md flex h-12 px-4 justify-between flex-row items-center"
                                >
                                    {/*<BiUpload />*/}
                                    <p className="ml-2">Upload dataset file</p>
                                </button>
                            </div>
                        </div>

                        <label className="text-white mt-10">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody."
                            className="w-[90%] text-white h-32 placeholder:text-gray-400  rounded-md mt-2 p-2 border  bg-pink-100 border-[#bfcfdc] focus:outline-none"

                        />
                        <div className="flex flex-row mt-10 w-[90%]  justify-between">

                            <div className="flex flex-col w-2/5   ">
                                <label className="text-[#9CA3AF]  text-sm">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-[90%] text-gray-400 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border  bg-pink-100 border-[#bfcfdc] focus:outline-none"
                                >
                                    <option>Music</option>
                                    <option>Sports</option>
                                    <option>Gaming</option>
                                    <option>News</option>
                                    <option>Entertainment</option>
                                    <option>Education</option>
                                    <option>Science & Technology</option>
                                    <option>Travel</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-2/5   ">
                                <label className="text-[#9CA3AF]  text-sm">Dataset Licence</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-[90%] text-gray-400 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border  bg-pink-100 border-[#bfcfdc] focus:outline-none"
                                >
                                    <option>MIT LICENSE</option>
                                    <option>GNU GENERAL PUBLIC LICENSE</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default EmailCodeVerify