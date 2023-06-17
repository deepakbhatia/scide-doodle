export const GET = async (request) => {
    try {
        //await connectToDB()

        //const prompts = await Prompt.find({}).populate('creator')
        const models = [
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
        return new Response(JSON.stringify(models), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all models", { status: 500 })
    }
}