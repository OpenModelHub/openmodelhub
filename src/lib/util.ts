// when exceeds maxLength, will cut string to maxLength and appends '...'.
export function cutStrLen(originalString: string, maxLength: number) {
  if (originalString.length > maxLength) {
    return originalString.slice(0, maxLength + 1) + '...'
  }
  return originalString
}
