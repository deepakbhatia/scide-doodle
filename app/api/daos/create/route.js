export const POST = async (request) => {
    const { user, logo, token, daoName, dataSetUrl, daoDescription, category, votingType, governanceParticipants, proposalCreators, gated} = await request.json();

    try {
        // await connectToDB();
        // const newPrompt = new Prompt({ creator: userId, prompt, tag });

        const newDao =  {
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
        //await newPrompt.save();
        return new Response(JSON.stringify(newDao), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new dao", { status: 500 });
    }
}
