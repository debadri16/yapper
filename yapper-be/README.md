# LLM configuration

Backend used: [llama.cpp](https://github.com/ggerganov/llama.cpp)

Binding used: [node-llama-cpp](https://github.com/withcatai/node-llama-cpp)

Pre-trained and quantized model used: [LLaMa 2 - 7b](https://huggingface.co/TheBloke/Llama-2-7B-GGUF/blob/main/llama-2-7b.Q5_K_M.gguf)

Further details of models and memory/disk requirements can be found [here](https://github.com/ggerganov/llama.cpp?tab=readme-ov-file#memorydisk-requirements).

## Package installation guide

### Download using `npm`

- Execute `npm install --save node-llama-cpp`
- Follow the instructions on their official [guide](https://withcatai.github.io/node-llama-cpp/guide/).

### Enable **CUDA** support for servers with **NVIDIA** GPU

- This step is optional. Required for hardware acceleration by offloading to **CUDA** supported GPUs.
- Install only the `Requirements` mentioned on [cmake-js](https://github.com/cmake-js/cmake-js).
- **Windows** installation is mentioned below, for other platforms, follow the official [guide](https://forums.developer.nvidia.com/t/windows-10-cuda-installation-failure-solved/64389).
- **Windows** installation of `MS Visual Studio` as a pre-requisite:
    - Install **Microsoft Visual Studio Build Tools** with `Desktop Development with C++` component.
    - Keep the selected features and make sure that `Windows <version> SDK` is selected.
    - Install `MS Visual Studio Community Edition` since it is lighter than the other versions.
    - The above 2 steps can be done together while installing `MS Visual Studio Community Edition`.
- **Windows** installation of `CUDA Toolkit`:
    - Install `CUDA Toolkit` 12.0 or higher. Make sure the version is supported by the NVIDIA GPU.
    - Uncheck `Driver components`, `Other components` and `NVIDIA GeForce Experience` if the current or updated versions are already present.
    - Keep `Visual Studio Integration` option checked under `CUDA`.
    - For failures related to CUDA Toolkit installation folow this [discussion forum](https://forums.developer.nvidia.com/t/windows-10-cuda-installation-failure-solved/64389).

## Building `node-llama-cpp` with **CUDA** support

- Execute `npx --no node-llama-cpp download --cuda` to build with **CUDA** support.
- Sometimes if `VS Build Tools` and `CUDA Toolkit` are not properly installed sequentially then the build might not be able to detect `CUDA Toolset` (*not Toolkit*):
    - Follow this [Github discussion](https://github.com/NVlabs/tiny-cuda-nn/issues/164) for resolving the build error.
- For detailed instructions and debugging follow the official guide on `node-llama-cpp` [CUDA Support](https://withcatai.github.io/node-llama-cpp/guide/CUDA).

## Validating the model

To validate that the downloaded model is working properly, run the following command to chat with it:

`npx --no node-llama-cpp chat --model <path-to-a-model-file-on-your-computer>`