import { getFetch, streamPostFetch } from './http'

const OLLAMA_BASE_URL = 'http://localhost:11434/api' // TODO: change this to config when config feature is available

export function streamGenerateResponse(
  model: string,
  inputPrompt: string,
  context: number[]
) {
  const requestBody: GenerateCompletionRequest = {
    model: model,
    prompt: inputPrompt,
    context,
  }

  return streamPostFetch(
    `${OLLAMA_BASE_URL}/generate`,
    JSON.stringify(requestBody)
  )
}

export async function fetchModels(): Promise<ListModelsResponse> {
  return getFetch(`${OLLAMA_BASE_URL}/tags`).then(async (res) => {
    const obj = JSON.parse(res)
    return obj
  })
}
