interface ChatCompletionRequest {
  model: string
  messages: ChatMessage[]
  tools?: Tool[]
  format?: string | object
  options?: object
  stream?: boolean
  keep_alive?: string
}

interface ChatCompletionResponse {
  model: string
  created_at: string
  message: ChatMessage
  done: boolean
  total_duration?: number
  load_duration?: number
  prompt_eval_count?: number
  prompt_eval_duration?: number
  eval_count?: number
  eval_duration?: number
}

type ChatRole = 'user' | 'system' | 'assistant' | 'tool'

interface ChatMessage {
  role: ChatRole
  content: string
  images?: string[]
  tool_calls?: ToolCall[]
}

interface CopyModelRequest {
  source: string
  destination: string
}

interface CreateModelRequest {
  model: string
  from?: string
  files?: Record<string, string>
  adapters?: Record<string, string>
  template?: string
  license?: string | string[]
  system?: string
  parameters?: object
  messages?: ChatMessage[]
  stream?: boolean
  quantize?: string
}

interface CreateModelResponse {
  status: string
}

interface DeleteModelRequest {
  model: string
}

interface GenerateCompletionRequest {
  model: string
  prompt: string
  suffix?: string
  images?: string[]
  format?: string | object
  options?: object
  system?: string
  template?: string
  stream?: boolean
  raw?: boolean
  keep_alive?: string
  context?: TokenContext
}

interface GenerateCompletionResponse {
  model: string
  created_at: string
  response: string
  done: boolean
  context?: TokenContext
  total_duration?: number
  load_duration?: number
  prompt_eval_count?: number
  prompt_eval_duration?: number
  eval_count?: number
  eval_duration?: number
}

interface GenerateEmbeddingsRequest {
  model: string
  input: string | string[]
  truncate?: boolean
  options?: object
  keep_alive?: string
}

interface GenerateEmbeddingsResponse {
  model: string
  embeddings: number[][]
  total_duration: number
  load_duration: number
  prompt_eval_count: number
}

interface Model {
  name: string
  modified_at: string
  size: number
  digest: string
  details: {
    format: string
    family: string
    families: string[] | null
    parameter_size: string
    quantization_level: string
  }
}

interface ListModelsResponse {
  models: Model[]
}

interface ListRunningModelsResponse {
  models: {
    name: string
    model: string
    size: number
    digest: string
    details: {
      parent_model: string
      format: string
      family: string
      families: string[]
      parameter_size: string
      quantization_level: string
    }
    expires_at: string
    size_vram: number
  }[]
}

interface PullModelRequest {
  model: string
  insecure?: boolean
  stream?: boolean
}

interface PushModelRequest {
  model: string
  insecure?: boolean
  stream?: boolean
}

interface ShowModelRequest {
  model: string
  verbose?: boolean
}

interface ShowModelResponse {
  modelfile: string
  parameters: string
  template: string
  details: {
    parent_model: string
    format: string
    family: string
    families: string[]
    parameter_size: string
    quantization_level: string
  }
  model_info: object
}

type TokenContext = number[]

interface Tool {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: {
      type: 'object'
      properties: {
        [key: string]: {
          type: string
          description: string
          [key: string]: string
        }
      }
      required: string[]
    }
  }
}

interface ToolCall {
  function: {
    name: string
    arguments: Record<string, string>
  }
}

interface VersionResponse {
  version: string
}
