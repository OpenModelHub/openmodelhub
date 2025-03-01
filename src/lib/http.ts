import { Channel, invoke } from '@tauri-apps/api/core'

export type StreamEvent = {
  chunkResponse: string
}

export async function streamPostFetch(
  uri: string,
  body: string,
  onData: (message: StreamEvent) => void
) {
  const onEvent = new Channel<StreamEvent>()
  onEvent.onmessage = onData

  return invoke('fetch_post_stream', {
    uri,
    body,
    onEvent,
  })
}
