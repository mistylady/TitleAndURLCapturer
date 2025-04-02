export const validFilename = (param: { filename: string }): boolean => {
  const forbiddenChars = /[<>:"\/\\|?*\0 \u3000]/g
  return !forbiddenChars.test(param.filename)
}
