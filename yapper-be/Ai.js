// import { fileURLToPath } from "url";
// import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function LLMChat() {
    const model = new LlamaModel({
        modelPath: "E:/LLMs/mistral-7b-v0.1.Q6_K.gguf",
        gpuLayers: 33,
        topK: 0,
        temperature: 0.8
    });
    const context = new LlamaContext({ model });
    const session = new LlamaChatSession({ context });


    const q1 = "Hi there, how are you?";
    console.log("User: " + q1);

    const a1 = await session.prompt(q1);
    console.log("AI: " + a1);


    const q2 = "Give me an example of NEON SIMD optimized code for GEMM in C++?";
    console.log("User: " + q2);

    const a2 = await session.prompt(q2);
    console.log("AI: " + a2);

    const q3 = "Tell me a poem about Toyota";
    console.log("User: " + q3);

    const a3 = await session.prompt(q3);
    console.log("AI: " + a3);
}

export default LLMChat;