import * as dotenv from 'dotenv'
dotenv.config()
import {ethers} from "ethers";

export const POST = async (request) => {
    try{
        const { user } = await request.json();
        //Check user credit
        const provider = new ethers.providers.JsonRpcProvider("https://filecoin-calibration.chainup.net/rpc/v1", 314159);
        const signer = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
        const gasPrice = provider.getGasPrice()
        const nonce = provider.getTransactionCount(signer.address, 'latest')
        const transaction = {
            to: user,
            value: 10000000000000,
            gasPrice,
            gasLimit: ethers.utils.hexlify(1000000000),
            nonce,
        }
        const trx = await signer.sendTransaction(transaction)
        return new Response(
            JSON.stringify({txHash: trx['hash']}),
            {status: 200})
    }catch (e) {
        throw  e
    }
}