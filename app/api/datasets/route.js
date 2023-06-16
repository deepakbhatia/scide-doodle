export const GET = async (request) => {
    try {
        //await connectToDB()

        //const prompts = await Prompt.find({}).populate('creator')
        const datasets = [

            {
                id: '1',
                user: 'some_user',
                dataSetName: 'A generative image dataset',
                dataSetUrl: 'https://skylion007.github.io/OpenWebTextCorpus/',
                dataSetDescription:'An open-source replication of the WebText dataset from OpenAI, that was used to train GPT-2.',
                category:'text-to-image',
                licence:'Commercial'
            }
        ]
        return new Response(JSON.stringify(datasets), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all datasets", { status: 500 })
    }
}