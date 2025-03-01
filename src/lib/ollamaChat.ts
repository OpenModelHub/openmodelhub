import { StreamEvent, streamPostFetch } from './http'
import { fetch } from '@tauri-apps/plugin-http'

const OLLAMA_BASE_URL = 'http://localhost:11434/api' // TODO: change this to config when config feature is available

export async function streamGenerateResponse(
  model: string,
  inputPrompt: string,
  onData: (message: StreamEvent) => void
) {
  const requestBody: GenerateCompletionRequest = {
    model: model,
    prompt: inputPrompt,
  }

  return streamPostFetch(
    `${OLLAMA_BASE_URL}/generate`,
    JSON.stringify(requestBody),
    onData
  )
}

export async function fetchModels(): Promise<ListModelsResponse> {
  return fetch(`${OLLAMA_BASE_URL}/api/tags`, {
    method: 'GET',
  }).then((res) => res.json())
}
