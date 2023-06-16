export const GET = async (request) => {
    try {
        //await connectToDB()

        //const prompts = await Prompt.find({}).populate('creator')
        const proposals = [
            {
                id:'',
                user: '',
                daoId:'',
                title:'',
                description:'',
                assetUrl: null,
                proposalType:'',
            }
        ]
        return new Response(JSON.stringify(proposals), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all proposals", { status: 500 })
    }
}