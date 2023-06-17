'use client';
import React, { useState, useRef } from "react";
import {useRouter} from "next/navigation";

const CreateProposal = () => {
    const router = useRouter()
    const [title, setProposalTitle] = useState("");
    const [description, setDescription] = useState("");
    const [proposalType, setProposalType] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [proposalPost, setProposalPost] = useState({
        user: '',
        daoId:'',
        title:'',
        description:'',
        assetUrl: null,
        proposalType:'',
    });


    //setSubmitting(true)
    return (
        <div className='w-full max-w-full flex-start flex-col'>
            <h3 className='head_text text-left'>
                <span className='blue_gradient'>Add Dao</span>
            </h3>
            <div className="flex flex-col glassmorphism mt-5 w-[60%]">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex lg:w-3/4 flex-col ">
                        <label className='font-satoshi font-semibold text-base text-gray-700'>Proposal title</label>
                        <input
                            value={title}
                            onChange={(e) => setProposalTitle(e.target.value)}
                            placeholder="Best Dao"
                            className="w-[90%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                        />

                        <div className="flex flex-row mt-5 w-[90%]  justify-between">

                            <div className="flex flex-col w-2/5   ">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Category</label>
                                <select
                                    value={proposalType}
                                    onChange={(e) => setProposalType(e.target.value)}
                                    className="w-[90%] text-gray-400 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"
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

                        </div>

                        <label className='font-satoshi font-semibold text-base text-gray-700'>Dataset or Model Asset Url</label>
                        <input
                            value={title}
                            onChange={(e) => setProposalTitle(e.target.value)}
                            placeholder="Url of the dataset or model that is added to the platform"
                            className="w-[90%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                        />
                        <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the community you want to build and what you to achieve"
                            className="w-[90%] text-white h-32 placeholder:text-gray-400  rounded-md mt-2 p-2 border   border-[#bfcfdc] focus:outline-none"

                        />

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

export default CreateProposal