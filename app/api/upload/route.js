import * as dotenv from 'dotenv'
dotenv.config()
import lighthouse from '@lighthouse-web3/sdk'

export const POST = async (request) => {
    const uploadResponse = await lighthouse.uploadBuffer(buffer, process.env.NEXT_PUBLIC_LIGHTHOUSE_SDK_KEY);
}