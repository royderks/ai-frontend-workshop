import { OpenAI } from "@langchain/openai";

const llm = new OpenAI({
    openAIApiKey: import.meta.env.VITE_OPENAI_KEY,
    temperature: 1
});

export async function generateAnswer(question: string) {
    let answer = ''

console.log({question})

    try {
        answer = await llm.invoke(question);
    } catch (e) {
        return 'Something went wrong'
    }

    return answer
}