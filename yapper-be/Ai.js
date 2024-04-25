// import { fileURLToPath } from "url";
// import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function LLMChat() {
    const model = new LlamaModel({
        modelPath: "E:/LLMs/llama-2-7b.Q5_K_M.gguf",
        gpuLayers: 25
    });
    const context = new LlamaContext({ model });
    const session = new LlamaChatSession({ context });


    const q1 = "Hi there, how are you?";
    console.log("User: " + q1);

    const a1 = await session.prompt(q1);
    console.log("AI: " + a1);


    const q2 = "What is the biggest carnivore?";
    console.log("User: " + q2);

    const a2 = await session.prompt(q2);
    console.log("AI: " + a2);
}

export default LLMChat;