export const POST = async (request) => {
    const { user, datasetName, dataSetUrl, datasetDescription, category, licence } = await request.json();

    try {
        // await connectToDB();
        // const newPrompt = new Prompt({ creator: userId, prompt, tag });

        const newDataset =  {
            user: '',
            datasetName: '',
            dataSetUrl: '',
            datasetDescription:'',
            category:'',
            licence:''
        }
        //await newPrompt.save();
        return new Response(JSON.stringify(newDataset), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Dataset", { status: 500 });
    }
}
