export const GET = async (request) => {
    try {
        //await connectToDB()

        //const prompts = await Prompt.find({}).populate('creator')
        const proposals = [
            {
                user: '',
                dao:'',
                modelName: '',
                modelUrl: '',
                modelDescription:'',
                category:'',
                accuracy:'',
                precision:'',
                recall:'',
                trainingDataUrl:'',
                dockerImageUrl:'',

            }
        ]
        return new Response(JSON.stringify(proposals), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all proposals", { status: 500 })
    }
}