import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate, FewShotChatMessagePromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

const llm = new ChatOpenAI({
    openAIApiKey: import.meta.env.VITE_OPENAI_KEY,
    temperature: 1,
    modelName: "gpt-4-0125-preview",
});

let vectorStore: MemoryVectorStore;

export async function generateAndStoreEmbeddings() {
    const trainingText = await fetch("/data.txt")
        .then((response) => response.text())
        .then((text) => text)

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
    });

    const docs = await textSplitter.createDocuments([trainingText]);

    vectorStore = await MemoryVectorStore.fromDocuments(
        docs,
        new OpenAIEmbeddings({ openAIApiKey: import.meta.env.VITE_OPENAI_KEY }),
    );
}

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

export async function generateAnswerRAG(question: string) {
    let answer = ''

    const prompt = ChatPromptTemplate.fromTemplate(`
Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {input}`
    );

    const documentChain = await createStuffDocumentsChain({
        llm,
        prompt,
    });

    const retriever = vectorStore.asRetriever();

    const retrievalChain = await createRetrievalChain({
        combineDocsChain: documentChain,
        retriever,
    });

    try {
        const result = await retrievalChain.invoke({
            input: question,
          });

        answer = result?.answer
    } catch (e) {
        console.log(e)

        return 'Something went wrong'
    }

    return answer
}
