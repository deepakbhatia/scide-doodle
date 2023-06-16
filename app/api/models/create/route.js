export const POST = async (request) => {
    const { user, modelName, modelUrl, modelDescription, category, accuracy, precision, recall, trainingDataUrl, dockerImageUrl, licence } = await request.json();


    try {
        // await connectToDB();
        // const newPrompt = new Prompt({ creator: userId, prompt, tag });
        //
        // await newPrompt.save();
        const newModel =  {
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
        return new Response(JSON.stringify(newModel), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new model", { status: 500 });
    }
}
