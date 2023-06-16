export const GET = async (request) => {
    try {
        //await connectToDB()

        //const datasets = await Prompt.find({}).populate('creator')
        const datasets = [
            {
                user: '',
                dao:'',
                datasetName: '',
                dataSetUrl: '',
                datasetDescription:'',
                category:'',
                licence:''
            }
        ]
        return new Response(JSON.stringify(datasets), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all datasets", { status: 500 })
    }
}