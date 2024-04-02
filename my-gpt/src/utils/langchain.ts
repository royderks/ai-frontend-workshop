import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, FewShotChatMessagePromptTemplate } from "@langchain/core/prompts";

const llm = new ChatOpenAI({
    openAIApiKey: import.meta.env.VITE_OPENAI_KEY,
    temperature: 1,
    modelName: "gpt-4-0125-preview",
});

export async function generateAnswer(
    question: string,
    promptTemplate: string = "Take the role of a Personal travel assistant, that answers questions in a consistent way."
) {
    let answer = ''

    const examples = [
        {
            input: "What are the best restaurants in Amsterdam?",
            output: "The highest rated restaurants in Amsterdam are (1), (2), (3)",
        },
        {
            input: "What is the best time of the year to visit The Netherlands?",
            output: "Summer",
        },
    ];

    const examplePrompt = ChatPromptTemplate.fromTemplate(`User: {input}
Assistant: {output}`);

    const fewShotPrompt = new FewShotChatMessagePromptTemplate({
        prefix: promptTemplate,
        suffix: "User: {input} Assistant:",
        examplePrompt,
        examples,
        inputVariables: ["input"],
    });

    const formattedPrompt = await fewShotPrompt.format({
        input: question,
    });

    try {
        const result = await llm.invoke(formattedPrompt);

        answer = result?.content as string
    } catch (e) {
        console.log(e)

        return 'Something went wrong'
    }

    return answer
}
