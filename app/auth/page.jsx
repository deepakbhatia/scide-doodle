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

const EmailAuth = () => {
    const [email, setEmail] = useState(null)
    const [code, setCode] = useState(null)
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
        debug: true
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
        console.log("-------------------------register-------------------------")
        console.log(authMethod);
        console.log("------------------------register--------------------------")
        setAccessToken(authMethod.accessToken);
        let res = await otpSession.fetchPKPsThroughRelayer(authMethod);
        if(res.length == 0){
            res = otpSession.mintPKPThroughRelayer(authMethod)
        }
        //
        // let mintRes = await otpSession.mintPKPThroughRelayer(authMethod);
        // console.log(mintRes);
        console.log("***********************register******************************")
        //updatePkpState(res);
        setAccessToken(authMethod.accessToken);
        setSelectedPkp(res[0]);
        console.log("litAccess:","---------------");
        let litAccess = { accessToken: authMethod.accessToken, pkp: res[0]}
        console.log("litAccess:",litAccess)
        // if(Cookies.get('lit') != undefined){
        //     litAccess = JSON.parse(Cookies.get('lit'))
        //     litAccess['accessToken'] = authMethod.accessToken
        //     litAccess['pkp'] = res[0]
        // }
        console.log("litAccess:","---------------");
        console.log("litAccess:",litAccess)
        Cookies.set('lit', JSON.stringify(litAccess), { expires: 7 })
        const keys = await createKeys()
        setKeys(keys)
        await signSessionsig()
        //setState('display');
        router.push("/");
    };
    const apiKeys = async () => {

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
        body: JSON.stringify({address: ''})
        });
        const data = await postKeys.json();
        console.log(data)
        //setAllDatasets(data);
    };


    const signSessionsig = async () => {

        try {
            await litNodeClient.connect();

            const encryptedSymmetricKey = keys['encryptedSymmetricKey']
            const symmetricKey = keys['symmetricKey']

            const authNeededCallback = async authCallbackParams => {
                let chainId = 3141;
                try {

                } catch {
                    // Do nothing
                }
                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
                console.log(authCallbackParams);
                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
                let response = await litNodeClient.signSessionKey({
                    authMethods: [
                        {
                            authMethodType: 7,
                            accessToken: accessToken,
                        },
                    ],
                    pkpPublicKey: selectedPkp.publicKey,
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
            const sessionSigs = await litNodeClient.getSessionSigs({
                expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
                chain: "ethereum",
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
            console.log("sessionSigs: ", sessionSigs);


            setSessionSig(sessionSigs);
            console.log(selectedPkp)
            const unifiedAccessControlConditions = getUnifiedAccessControlConditions(
                selectedPkp.ethAddress
            );
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 3232323232")
            // store the decryption conditions
            const val = await litNodeClient.saveEncryptionKey({
                unifiedAccessControlConditions,
                symmetricKey,
                encryptedSymmetricKey,
                sessionSigs, // Not actually needed for storing encryption condition.
                chain: "hyperspace",
            });
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 444444")
            console.log(val)
            console.log(
                "unifiedAccessControlConditions: ",
                unifiedAccessControlConditions
            );
            const keys = await apiKeys()
            if(keys?.ok){
                const keyVal = keys.json()
                const retrievedSymmKey = await litNodeClient.getEncryptionKey({
                    unifiedAccessControlConditions,
                    toDecrypt: LitJsSdk.uint8arrayToString(keyVal['encryptedSymmetricKey'], "base16"),
                    sessionSigs,
                    chain: "hyperspace"
                });
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 555555555")
                const decryptedString = await LitJsSdk.decryptString(
                    keyVal['encryptedString'],
                    retrievedSymmKey
                );
                console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
                console.log(decryptedString)
            }

        } catch(e) {
            console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            console.log(e);
            setErr(e);
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