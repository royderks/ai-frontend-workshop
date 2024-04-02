import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const llm = new ChatOpenAI({
    openAIApiKey: import.meta.env.VITE_OPENAI_KEY,
    temperature: 1,
    modelName: "gpt-4-0125-preview", 
});

export async function generateAnswer(
    question: string,
    promptTemplate: string = "Take the role of a {role}, that answers questions in a {style} way.",
    role: string = "Personal travel assistant",
    style: string = "consistent" // What happens if you change this to detailed?
) {
    let answer = ''

    const chatPrompt = ChatPromptTemplate.fromMessages([
        ["System", promptTemplate],
        ["User", "{question}"],
    ])

    const formattedPrompt = await chatPrompt.formatMessages({
        role,
        style,
        question
    });
    
    try {
        const result = await llm.invoke(formattedPrompt);

        answer = result?.content as string

    } catch (e) {
        return 'Something went wrong'
    }

    return answer
}
