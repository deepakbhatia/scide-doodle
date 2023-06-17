export const GET = async (request) => {
    try {
        //await connectToDB()

        //const prompts = await Prompt.find({}).populate('creator')
        const model = [
            {
                user: '',
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
        return new Response(JSON.stringify(model), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all model", { status: 500 })
    }
}