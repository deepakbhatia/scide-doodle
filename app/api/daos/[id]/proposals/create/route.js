export const POST = async (request) => {
    const { user, daoId, title, description, assetUrl, proposalType } = await request.json();

    try {
        // await connectToDB();
        // const newPrompt = new Prompt({ creator: userId, prompt, tag });

        const newDaoProposal =  {
            id:'',
            user: '',
            daoId:'',
            title:'',
            description:'',
            assetUrl: null,
            proposalType:'',
        }
        //await newPrompt.save();
        return new Response(JSON.stringify(newDaoProposal), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Dataset", { status: 500 });
    }
}
