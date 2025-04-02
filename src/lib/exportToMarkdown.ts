import { DEFAULT_TITLE } from "~config/parameter"

const generateMarkDownContent = (params: {
  title: string
  content: string
}): string => {
  return `## ${params.title || DEFAULT_TITLE}\n\n${params.content}`
}

export const exportToMarkDown = (params: {
  title: string
  content: string
}): Promise<number> => {
  const markdownContent: string = generateMarkDownContent({
    title: params.title,
    content: params.content
  })
  const blob = new Blob([markdownContent], { type: "text/markdown" })
  const url: string = URL.createObjectURL(blob)

  return chrome.downloads.download({
    url: url,
    filename: `${params.title || DEFAULT_TITLE}.md`,
    saveAs: false
  })
}
