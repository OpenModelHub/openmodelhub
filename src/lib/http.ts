import { Channel, invoke } from '@tauri-apps/api/core'

export async function streamPostFetch(
  uri: string,
  body: string
): Promise<ReadableStream<Uint8Array>> {
  // if (!isTauri()) {
  //   const x = await fetch(uri, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Transfer-Encoding': 'chunked',
  //     },
  //     body,
  //   })
  //   // @ts-expect-error ts cannot
  //   return x.body
  // }

  const onEvent = new Channel<ArrayBuffer | number[]>()

  const readableStream = new ReadableStream({
    start: (controller) => {
      onEvent.onmessage = (res: ArrayBuffer | number[]) => {
        if (
          res instanceof ArrayBuffer ? res.byteLength == 0 : res.length == 0
        ) {
          controller.close()
          return
        }
        controller.enqueue(new Uint8Array(res))
      }
    },
  })

  invoke('fetch_post_stream', {
    uri,
    body,
    onEvent,
  })

  return readableStream
}

const FETCH_TIMEOUT_DURATION = 2500
export async function getFetch(uri: string): Promise<string> {
  return invoke('fetch_get', {
    uri,
    timeoutMs: FETCH_TIMEOUT_DURATION,
  })
}
