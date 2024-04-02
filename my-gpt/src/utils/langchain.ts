import { OpenAI } from "@langchain/openai";

const llm = new OpenAI({
    openAIApiKey: import.meta.env.VITE_OPENAI_KEY,
    temperature: 0 // lower temperature = less deterministic
});

export async function generateAnswer(question: string) {
    let answer = ''

    try {
        answer = await llm.invoke(question);
    } catch (e) {
        return 'Something went wrong'
    }

    return answer
}