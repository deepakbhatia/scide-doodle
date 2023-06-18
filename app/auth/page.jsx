'use client';
import {useState} from "react";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LitAuthClient } from '@lit-protocol/lit-auth-client';
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { ProviderType } from '@lit-protocol/constants';
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import * as LitJsSdk_authHelpers from "@node_modules/@lit-protocol/auth-helpers";
import {getUnifiedAccessControlConditions, hashBytes} from "@utils/accessConditions";
import {PKPEthersWallet} from "@node_modules/@lit-protocol/pkp-ethers";
import {ethers} from "@node_modules/ethers";

const EmailAuth = () => {
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    let [otpSession, setOtpSession] = useState({});
    let [verifyCode, setVerifyCode] = useState(false);
    let [userId, setUserId] = useState('');
    let [pkpInfo, setPkpInfo] = useState({});
    let [selectedPkp, setSelectedPkp] = useState({});
    let [pkpList, setPkpList] = useState({});
    let [action, setAction] = useState({});
    let [accessToken, setAccessToken] = useState("");
    let [sessionSig, setSessionSig] = useState("");
    let [err, setErr] = useState("");
    let [signature, setSignature] = useState("");
    let [keys, setKeys] = useState({});
    const router = useRouter();
    const litNodeClient = new LitNodeClient({
        litNetwork: "serrano",
        debug: false
    });
    const authClient = new LitAuthClient({

        redirectUri: '/',
        litRelayConfig: {
            relayApiKey: process.env.NEXT_PUBLIC_relayApiKey,
        },
        litOtpConfig: {
            baseUrl: "https://auth-api.litgateway.com",
            port: "443"
        }
    });
    const emailSubmitHandler = async(e) => {
        let transport = email;
        setUserId(transport);

        let session = authClient.initProvider(ProviderType.Otp,{
            userId: transport
        });
        console.log("session = ",session )
        let status = await session.sendOtpCode();


        if (status) {
            setOtpSession(session);
            setVerifyCode(true);
            e.target.defaultValue = '';
        }
    };

    const codeVerify = async (e) => {
        //let code = e.target.defaultValue;
        let authMethod = await otpSession.authenticate({code});
        setAccessToken(authMethod.accessToken);
        let res = await otpSession.fetchPKPsThroughRelayer(authMethod);
        if(res.length == 0){
            res = otpSession.mintPKPThroughRelayer(authMethod)
        }
        //
        // let mintRes = await otpSession.mintPKPThroughRelayer(authMethod);
        // console.log(mintRes);
        //updatePkpState(res);
        setAccessToken(authMethod.accessToken);
        setSelectedPkp(res[0]);
        let litAccess = { accessToken: authMethod.accessToken, pkp: res[0]}
        // if(Cookies.get('lit') != undefined){
        //     litAccess = JSON.parse(Cookies.get('lit'))
        //     litAccess['accessToken'] = authMethod.accessToken
        //     litAccess['pkp'] = res[0]
        // }

        Cookies.set('lit', JSON.stringify(litAccess), { expires: 7 })
        const apiKeys = await createKeys()

        await signSessionsig(apiKeys, litAccess)
        //setState('display');
        router.push("/");
    };
    const getApiKeys = async () => {

        const getKeys = await fetch("/api/platform-key");
        return getKeys
        //setAllDatasets(data);
    };
    const createKeys = async () => {

        const postKeys = await fetch("/api/platform-key", {
        method: 'POST',
            headers: {
            'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({address:''})
        });
        const data = await postKeys.json();
        return data
        //setAllDatasets(data);
    };


    const signSessionsig = async (apiKeys, litAccess) => {
        let sessionSigs = undefined
        try {
            await litNodeClient.connect();

            const encryptedSymmetricKey = apiKeys['encryptedSymmetricKey']
            const symmetricKey = apiKeys['symmetricKey']

            const authNeededCallback = async authCallbackParams => {
                let chainId = 1;
                try {

                } catch {
                    // Do nothing
                }

                let response = await litNodeClient.signSessionKey({
                    authMethods: [
                        {
                            authMethodType: 7,
                            accessToken: litAccess['accessToken'],
                        },
                    ],
                    pkpPublicKey: litAccess['pkp']['publicKey'],
                    expiration: authCallbackParams.expiration,
                    resources: authCallbackParams.resources,
                    chainId,
                });

                return response.authSig;
            };


            const hashedEncryptedSymmetricKeyStr = await hashBytes({
                bytes: new Uint8Array(encryptedSymmetricKey),
            });

            // Construct the LitResource
            const litResource = new LitJsSdk_authHelpers.LitAccessControlConditionResource(
                hashedEncryptedSymmetricKeyStr
            );

            // Get the session sigs
            sessionSigs = await litNodeClient.getSessionSigs({
                expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
                chain: "hyperspace",
                resourceAbilityRequests: [
                    {
                        resource: litResource,
                        ability:
                        LitJsSdk_authHelpers.LitAbility
                            .AccessControlConditionDecryption,
                    },
                ],
                switchChain: false,
                authNeededCallback,
            });


            //setSessionSig(sessionSigs);
            const unifiedAccessControlConditions = getUnifiedAccessControlConditions(
                litAccess['pkp']['ethAddress']
            );
            // store the decryption conditions
            const uInt8ArrayKey = Uint8Array.from(symmetricKey)
            const uInt8ArrayEncKey = Uint8Array.from(encryptedSymmetricKey)

            console.log(uInt8ArrayKey)
            console.log(uInt8ArrayEncKey)
            const key1 =  LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
            const val = await litNodeClient.saveEncryptionKey({
                unifiedAccessControlConditions: unifiedAccessControlConditions,
                encryptedSymmetricKey: uInt8ArrayEncKey,
                sessionSigs: sessionSigs, // Not actually needed for storing encryption condition.
                chain: "hyperspace",
            });

            const keys = await getApiKeys()
            //console.log(keys['encryptedString'])

            if(keys?.ok){
                const keyVal = await keys.json()
                console.log(keyVal)
                const encString = new Blob([keyVal['encryptedString']])
                const retrievedSymmKey = await litNodeClient.getEncryptionKey({
                    unifiedAccessControlConditions,
                    toDecrypt: LitJsSdk.uint8arrayToString(uInt8ArrayEncKey, "base16"),
                    sessionSigs,
                    chain: "ethereum"
                });
                console.log(keyVal['encryptedString'])
                const decryptedString = await LitJsSdk.decryptString(
                    encString,
                    retrievedSymmKey
                );
                console.log(decryptedString)
            }



        } catch(e) {
            console.log(e)
            setErr(e);
        }

        await authDao(sessionSigs)
    }

    const authDao = async (sessionSig) => {
        console.log("authDao")
        if(Cookies.get('lit') != undefined){
            const litJson = JSON.parse(Cookies.get('lit'))
            const accessToken = litJson['accessToken']
            const PKP_PUBKEY = litJson['pkp']['publicKey']
            console.log(PKP_PUBKEY)
            // const CONTROLLER_AUTHSIG = await LitJsSdk.checkAndSignAuthMessage({
            //     chain: "ethereum",
            // });
            //await litNodeClient.connect();
            //litNodeClient.getSE
            //
            // const authNeededCallback = async authCallbackParams => {
            //     let chainId = 3141;
            //     try {
            //
            //     } catch {
            //         // Do nothing
            //     }
            //     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            //     console.log(authCallbackParams);
            //     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            //     let response = await litNodeClient.signSessionKey({
            //         authMethods: [
            //             {
            //                 authMethodType: 7,
            //                 accessToken: accessToken,
            //             },
            //         ],
            //         pkpPublicKey: PKP_PUBKEY,
            //         expiration: authCallbackParams.expiration,
            //         resources: authCallbackParams.resources,
            //         chainId,
            //     });
            //
            //     return response.authSig;
            // };
            //
            // const sessionSigs = await litNodeClient.getSessionSigs({
            //     expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
            //     chain: "ethereum",
            //     resourceAbilityRequests: [
            //         {
            //             resource: litResource,
            //             ability:
            //             LitJsSdk_authHelpers.LitAbility
            //                 .AccessControlConditionDecryption,
            //         },
            //     ],
            //     switchChain: false,
            //     authNeededCallback,
            // });

            const pkpWallet = new PKPEthersWallet({
                pkpPubKey: PKP_PUBKEY,
                controllerSessionSigs: sessionSig,
                rpc: "https://api.calibration.node.glif.io/rpc/v1",

            });

            await pkpWallet.init();
            console.log(PKP_PUBKEY)
            const tx = {
                to: "0x1cD4147AF045AdCADe6eAC4883b9310FD286d95a",
                value: 0,
            };


            const signedTx = await pkpWallet.signTransaction(tx);
            console.log("signedTx:", signedTx);


            const sentTx = await pkpWallet.sendTransaction(signedTx);
            console.log("sentTx:", sentTx);

            const msg = "Secret Message.. shh!"
            const signedMsg = await pkpWallet.signMessage(msg);
            console.log("signedMsg:", signedMsg);


            const signMsgAddr = ethers.utils.verifyMessage(msg, signedMsg);
        }



    }

    return (
        <div className="w-full h-full flex flex-col items-center mt-[10%]">

            {verifyCode? (<div className="w-[40%] h-[80%] glassmorphism relative ">
            <div className="flex flex-col ">
                <label className='font-satoshi font-semibold  text-base text-gray-700 mt-5' >Email</label>

                <label className='font-satoshi text-base text-gray-700 mt-5'>{email}</label>

                <label className='font-satoshi font-semibold  text-base text-gray-700 mt-5'>Code</label>

                <input
                    value={code}
                    type={"number"}

                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    className="text-gray-900 placeholder:text-gray-400 flex-center rounded-md mt-5 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

                />
            </div>

            <div className="flex-1 flex flex-col mt-10">
                <div className="flex flex-row ">

                    <button
                        onClick={ codeVerify}
                        className=" bg-orange-300 text-white-400 py-2 rounded-md flex px-4 flex-row items-center my-5"
                    >
                        {/*<BiHome />*/}
                        <p className="ml-2">Cancel</p>
                    </button>
                    <button
                        onClick={ codeVerify }
                        className="bg-blue=500 bg-primary-orange text-white-400 py-2 rounded-md mx-5 my-5 flex px-4 justify-between flex-row items-center"
                    >
                        {/*<BiSave />*/}
                        <p className="ml-2">Submit</p>
                    </button>

                </div>
            </div>

        </div>)
                :
                (<div className="w-[40%] h-[80%] glassmorphism relative ">
            <div className="flex flex-col ">
                <label className='font-satoshi font-semibold  text-base text-gray-700 mt-5'>Email</label>

                <input
                    value={email}
                    type={"email"}

                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.smith@gmail.com"
                    className="dark:text-gray-900 placeholder:text-gray-400 flex-center rounded-md mt-5 h-12 p-2 border   border-[#bfcfdc] focus:outline-none"

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
                        onClick={emailSubmitHandler}
                        className="bg-blue=500 bg-primary-orange text-white-400 py-2 rounded-md mx-5 my-5 flex px-4 justify-between flex-row items-center"
                    >
                        {/*<BiSave />*/}
                        <p className="ml-2">Submit</p>
                    </button>

                </div>
            </div>

        </div>)}
        </div>

    );
}

export default EmailAuth