import {ethers} from "ethers";
import datasetNFTContract from '../../../../contracts/VIPDatasetToken.json';
import datasetNFTAddress from '../../../../contracts/VIPDatasetToken-contract-address.json';

const mintNFT = async (userAddress, url) => {
    try {

        const provider = new ethers.providers.JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1", 314159);
        const signer = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);

        // const user = provider.getSigner();
        // let userAddress = await user.getAddress();
        // console.log(userAddress)
        const vipdataset = new ethers.Contract(datasetNFTAddress.Token, datasetNFTContract.abi, signer);
        const tx = await vipdataset.safeMint(userAddress, url)
        const receipt = await tx.wait();
        // console.log(receipt['logs'][0]['topics']);
        // parseInt(receipt['logs'][0]['topics'][3])
        //console.log(tx);
        return new Response(JSON.stringify({txHash:receipt['logs'][0]['transactionHash'], tokenId:parseInt(receipt['logs'][0]['topics'][3])}), {status: 200})

    } catch (error) {
        throw error
    }
};

export const POST = async (request) => {
    const { user, dataSetUrl } = await request.json();


    try {
        // await connectToDB();
        // const newPrompt = new Prompt({ creator: userId, prompt, tag });
        //
        // await newPrompt.save();
        const mintedDataset = await mintNFT(user, dataSetUrl)
        return new Response(JSON.stringify(mintedDataset), { status: 201 })
    } catch (error) {
        return new Response("Failed to mint NFT", { status: 500 });
    }
}