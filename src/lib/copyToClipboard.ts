export const copyToClipboard = async (param: { text: string }) => {
  try {
    await navigator.clipboard.writeText(param.text)
  } catch {
    console.error("Failed to copy text.")
  }
}
