'use client';
import React, { useState, useRef } from "react";
import {useRouter} from "next/navigation";

const AddDao = () => {
    const router = useRouter()
    const [token, setToken] = useState("");
    const [daoName, setDaoName] = useState("");
    const [logo, setLogo] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [votingType, setVotingType] = useState("");
    const [governanceParticipants, setGovernanceParticipants] = useState("");
    const [proposalCreators, setProposalCreators] = useState("");
    const [gated, setGated] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [dataSetPost, setDataSetPost] = useState({
        user: '',
        logo:'',
        token: '',
        daoName: '',
        dataSetUrl: '',
        daoDescription:'',
        category:'',
        votingType:'',
        governanceParticipants:'',
        proposalCreators:'',
        gated:false
    });

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
    const storeLogo = async(e) =>{
        
    }
    //setSubmitting(true)
    return (
        <div className='w-full max-w-full flex-start flex-col'>
            <h3 className='head_text text-left'>
                <span className='blue_gradient'>Add Dao</span>
            </h3>
            <div className="flex flex-col glassmorphism mt-5 w-[60%]">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex lg:w-3/4 flex-col ">
                        <label className='font-satoshi font-semibold text-base text-gray-700'>Name of the Dao</label>
                        <input
                            value={daoName}
                            onChange={(e) => setDaoName(e.target.value)}
                            placeholder="Best Dao"
                            className="w-[90%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                        />

                        <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Token</label>
                        <input
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Abbreviation of token e.g. DTOK"
                            className="w-[90%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                        />

                        <div className="flex flex-row mt-5 w-[90%]  justify-between">

                            <div className="flex flex-col w-2/5   ">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
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

                        {/*<div className="flex flex-col w-2/5  mt-5 ">*/}
                        {/*    <label className='font-satoshi font-semibold text-base text-gray-700'>Proposal Type</label>*/}
                        {/*    <select*/}
                        {/*        value={proposalType}*/}
                        {/*        onChange={(e) => setProposalType(e.target.value)}*/}
                        {/*        className="w-[90%] text-gray-400 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"*/}
                        {/*    >*/}
                        {/*        <option>Dao approval for training</option>*/}
                        {/*        <option>Model Training</option>*/}
                        {/*        <option>Model acceptance for deployment</option>*/}
                        {/*        <option>Payouts</option>*/}
                        {/*        <option>Other Administrative</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}

                        <div className="flex flex-col mt-5  lg:flex-row">
                            <div className="flex flex-col justify-end flex-row">
                                <input          style={{display: 'none'}}
                                                ref={fileInputRef}
                                                onChange={e=>storeLogo(e)} type="file" />
                                <button
                                    onClick={handleClick}
                                    className='py-2 px-6 text-sm bg-orange-500 hover:bg-orange-400 rounded-md text-white'                                >
                                    {/*<BiUpload />*/}
                                    <p className="ml-2"> Dao Logo</p>
                                </button>
                            </div>
                        </div>

                        <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the community you want to build and what you to achieve"
                            className="w-[90%] text-white h-32 placeholder:text-gray-400  rounded-md mt-2 p-2 border   border-[#bfcfdc] focus:outline-none"

                        />
                        <div className="flex flex-col w-2/5">
                            <div className="flex flex-col w-full  mt-5 ">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Who can participate in governance?</label>
                                <select
                                    value={governanceParticipants}
                                    onChange={(e) => setGovernanceParticipants(e.target.value)}
                                    className="w-[90%] text-gray-400 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"
                                >
                                    <option>Token Holders</option>
                                    <option>Multi-sig members</option>

                                </select>
                            </div>

                            <div className="flex flex-col w-full mt-5  ">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Voting Type</label>
                                <select
                                    value={votingType}
                                    onChange={(e) => setVotingType(e.target.value)}
                                    className="w-[90%] text-gray-400 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"
                                >
                                    <option>Token Voting</option>
                                </select>
                            </div>

                            <div className="flex flex-col w-full  mt-5 ">
                                <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Who can create proposals?</label>
                                <select
                                    value={proposalCreators}
                                    onChange={(e) => setProposalCreators(e.target.value)}
                                    className="w-[90%] text-gray-400 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"
                                >
                                    <option>Token Holders</option>
                                    <option>Multi-sig members</option>

                                </select>
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
                        <p className="ml-2">Create Community</p>
                    </button>


                </div>

            </div>

        </div>
    );
}

export default AddDao