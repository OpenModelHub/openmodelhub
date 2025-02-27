import { streamFetch } from './http'

const OLLAMA_BASE_URL = 'http://localhost:11434/api' // TODO: change this to config when config feature is available

export async function* streamGenerateResponse(
  model: string,
  inputPrompt: string
): AsyncGenerator<GenerateCompletionResponse> {
  const request: GenerateCompletionRequest = {
    model: model,
    prompt: inputPrompt,
  }
  for await (const chunk of streamFetch(() =>
    fetch(`${OLLAMA_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
  )) {
    yield JSON.parse(chunk)
  }
}

export async function fetchModels(): Promise<ListModelsResponse> {
  return fetch(`${OLLAMA_BASE_URL}/api/tags`, {
    method: 'GET',
  }).then((res) => res.json())
}
