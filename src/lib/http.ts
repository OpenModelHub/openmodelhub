export async function* streamFetch(fetchCall: () => Promise<Response>) {
  const response = await fetchCall()
  if (response.body == null) return []
  const reader = response.body.getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    yield new TextDecoder().decode(value)
  }
}
