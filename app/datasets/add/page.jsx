'use client';
import React, { useState, useRef } from "react";
import {useRouter} from "@node_modules/next/navigation";
import lighthouse from "@node_modules/@lighthouse-web3/sdk";
import { ethers } from "ethers";
import datasetcontract from '../../../contracts/old/VIPDatasetToken.json'
//import { PKPEthersWallet } from '@lit-protocol/pkp-ethers';
import Cookies from "js-cookie";

const AddDataset = () => {
    const router = useRouter()
    const [datasetName, setdatasetName] = useState("");
    const [dataSetUrl, setDataSetUrl] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [licence, setLicence] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [dataSetPost, setDataSetPost] = useState({
        user: '',
        dao:'',
        datasetName: '',
        dataSetUrl: '',
        srcUrl: '',
        datasetDescription:'',
        category:'',
        licence:''
    });
    ////setSubmitting(true)
    // const mintNFT = async (url) => {
    //     try {
    //         const { ethereum } = window;
    //
    //         // Checking if user have Metamask installed
    //         if (!ethereum) {
    //             // If user doesn't have Metamask installed, throw an error
    //             alert("Please install MetaMask");
    //             return;
    //         }
    //
    //         const accounts = await ethereum.request({
    //             method: "eth_requestAccounts",
    //         });
    //
    //         const provider = new ethers.providers.Web3Provider(ethereum)
    //         const walletAddress = accounts[0]    // first account in MetaMask
    //         const signer = provider.getSigner(walletAddress)
    //         // const user = provider.getSigner();
    //         // let userAddress = await user.getAddress();
    //
    //         const vipdataset = new ethers.Contract('0xC0340c0831Aa40A0791cF8C3Ab4287EB0a9705d8', datasetcontract.abi, signer);
    //         const tx = await vipdataset.safeMint(walletAddress, url)
    //         const receipt = await tx.wait();
    //         console.log(receipt);
    //
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
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
    const uploadFile = async (file) =>{
        // Push file to lighthouse node
        // Both file and folder are supported by upload function

        const litAccess = Cookies.get('lit')
        if(litAccess != undefined) {
            const litJson = JSON.parse(litAccess)
            console.log(litJson)
            const user = litJson['pkp']['ethAddress']
            console.log(litJson)
            console.log(user)
            try{
                const output = await lighthouse.upload(file, process.env.NEXT_PUBLIC_LIGHTHOUSE_SDK_KEY, progressCallback);
                dataSetPost['dataSetUrl'] = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
                setDataSetPost(dataSetPost)
                //await mintNFT('https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
                const postKeys = await fetch("/api/datasets/mint", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user: user, dataSetUrl: 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash})
                });

                console.log(postKeys)
            }catch (e) {
                console.log(e)
            }
        }


        // /*
        //   output:
        //     data: {
        //       Name: "filename.txt",
        //       Size: 88000,
        //       Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        //     }
        //   Note: Hash in response is CID.
        // */

        //console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    }

    return (
        <div className='w-full max-w-full flex-start flex-col'>
            <h3 className='head_text text-left'>
                <span className='blue_gradient'>Add Dataset</span>
            </h3>
            <div className="flex flex-col glassmorphism mt-5 w-[60%]">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex lg:w-3/4 flex-col ">

                        <label className='font-satoshi font-semibold text-base text-gray-700 mt-5'>Add dataset Url</label>
                        <input
                            value={dataSetUrl}
                            type={"url"}

                            onChange={(e) => setDataSetUrl(e.target.value)}
                            placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                            className="w-[90%] text-white placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                        />

                        <div className="flex flex-col mt-5  lg:flex-row">
                            <div className="flex lg:w-3/4 flex-col ">
                                <label className='font-satoshi font-semibold text-base text-gray-700'>Dataset Name</label>
                                <input
                                    value={datasetName}
                                    onChange={(e) => setdatasetName(e.target.value)}
                                    placeholder="Text to image generative dataset"
                                    className="w-[60%] text-slate-800 placeholder:text-gray-400  rounded-md mt-2 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                                />
                            </div>
                            <div className="flex items-center justify-end">
                                <input          style={{display: 'none'}}
                                                ref={fileInputRef}
                                                onChange={e=>uploadFile(e.target.files)} type="file" />
                                <button
                                    onClick={handleClick}
                                    className='py-2 px-6 text-sm bg-orange-500 hover:bg-orange-400 rounded-md text-white'                                >
                                    {/*<BiUpload />*/}
                                    <p className="ml-2"> Dataset file</p>
                                </button>
                            </div>
                        </div>

                        <label className="text-white mt-5">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody."
                            className="w-[90%] text-white h-32 placeholder:text-gray-400  rounded-md mt-2 p-2 border   border-[#bfcfdc] focus:outline-none"

                        />
                        <div className="flex flex-row mt-5 w-[90%]  justify-between">

                            <div className="flex flex-col w-2/5   ">
                                <label className="text-[#9CA3AF]  text-sm">Category</label>
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
                            <div className="flex flex-col w-2/5   ">
                                <label className="text-[#9CA3AF]  text-sm">Dataset Licence</label>
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

export default AddDataset