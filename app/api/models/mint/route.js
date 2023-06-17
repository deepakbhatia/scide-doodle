import {ethers} from "ethers";
import modelNFTContract from '../../../../contracts/old/VIPModelToken.json';
import modelNFTContractAddress from '../../../../contracts/old/VIPModelToken-contract-address.json';
const mintNFT = async (userAddress, url) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider("https://filecoin-calibration.chainup.net/rpc/v1", 314159);
        const signer = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
        const vipdataset = new ethers.Contract(modelNFTContractAddress.Token, modelNFTContract.abi, signer);
        const tx = await vipdataset.safeMint(userAddress, url)
        const receipt = await tx.wait();
        return new Response(
            JSON.stringify(
                {
                    txHash:receipt['logs'][0]['transactionHash'],
                    tokenId:parseInt(receipt['logs'][0]['topics'][3])
                }),
            {status: 200}
        )
    } catch (error) {
        console.log(error);
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