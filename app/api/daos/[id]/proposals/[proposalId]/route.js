export const GET = async (request) => {
    try {
        //await connectToDB()

        //const prompts = await Prompt.find({}).populate('creator')
        const proposal =
            {
                id:'',
                user: '',
                daoId:'',
                title:'',
                description:'',
                assetUrl: null,
                proposalType:'',
            }

        return new Response(JSON.stringify(proposal), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch  proposal", { status: 500 })
    }
}