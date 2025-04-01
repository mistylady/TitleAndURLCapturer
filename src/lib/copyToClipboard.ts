export const copyToClipboard = async (param: { text: string }) => {
  let isSuccess: boolean

  try {
    await navigator.clipboard.writeText(param.text)
    isSuccess = true
  } catch {
    isSuccess = false
  }
  return isSuccess
}
