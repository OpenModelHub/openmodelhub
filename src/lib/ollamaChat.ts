import { streamPostFetch } from './http'
import { fetch } from '@tauri-apps/plugin-http'

const OLLAMA_BASE_URL = 'http://localhost:11434/api' // TODO: change this to config when config feature is available

export function streamGenerateResponse(model: string, inputPrompt: string) {
  const requestBody: GenerateCompletionRequest = {
    model: model,
    prompt: inputPrompt,
  }

  return streamPostFetch(
    `${OLLAMA_BASE_URL}/generate`,
    JSON.stringify(requestBody)
  )
}

export async function fetchModels(): Promise<ListModelsResponse> {
  return fetch(`${OLLAMA_BASE_URL}/tags`, {
    method: 'GET',
  }).then((res) => res.json())
}
