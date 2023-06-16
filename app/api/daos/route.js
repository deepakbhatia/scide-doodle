export const GET = async (request) => {
    try {
        //await connectToDB()

        //const prompts = await Prompt.find({}).populate('creator')
        const daos = [
            {
                user: '',
                logo:'',
                token: '',
                daoName: '',
                dataSetUrl: '',
                daoDescription:'',
                category:'',
                votingType:'',
                governanceParticipants:'',
                proposalCreators:'',
                gated:false
            }
        ]
        return new Response(JSON.stringify(daos), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all daos", { status: 500 })
    }
}