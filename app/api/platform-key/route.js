
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import {newSessionCapabilityObject, LitAccessControlConditionResource, LitAbility} from '@lit-protocol/auth-helpers';
import * as LitJsSdk_blsSdk from "@lit-protocol/bls-sdk";

const encs = {val: undefined}
async function getLitNodeClient() {
    const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
        litNetwork: "serrano",
    });
    await litNodeClient.connect();

    return litNodeClient;
}

export const GET = async (request) => {
    if(encs['val'] != undefined){
        return new Response(JSON.stringify({ encryptedSymmetricKey: encs['val']['encryptedSymmetricKey'], encryptedString: encs['val']['encryptedString'] }), { status: 200 })
    }else{
        return new Response(JSON.stringify({ message: 'Keys not found' }), { status: 404 })

    }
}
export const POST = async (request) => {
    try {
        //await connectToDB()

        //const prompts = await Prompt.find({}).populate('creator')
        // key parameter - encrypt symmetric key then hash it
        // get the user a session with it


        const litNodeClient = await getLitNodeClient();
        const token = crypto.randomUUID();
        console.log("token:",token);
        const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
            token
        );

        console.log(encryptedString);
        //Save to db

        const encryptedSymmetricKey = LitJsSdk_blsSdk.wasmBlsSdkHelpers.encrypt(
            LitJsSdk.uint8arrayFromString(litNodeClient.subnetPubKey, "base16"),
            symmetricKey
        );
        encs['val'] = JSON.stringify({ encryptedString: encryptedString,encryptedSymmetricKey: encryptedSymmetricKey, symmetricKey: symmetricKey });
        return new Response(JSON.stringify({ encryptedString: encryptedString,encryptedSymmetricKey: encryptedSymmetricKey, symmetricKey: symmetricKey }), { status: 200 })
    } catch (error) {
        return new Response("Failed to generate APIkey", { status: 500 })
    }
}