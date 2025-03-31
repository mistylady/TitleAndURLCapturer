const getTitleAndURL = async () => {
  const tabsInfoList: chrome.tabs.Tab[] = await chrome.tabs.query({
    currentWindow: true
  })
  return { tabsInfoList }
}

export const getFormattedTitleAndURL = async () => {
  const { tabsInfoList } = await getTitleAndURL()
  return tabsInfoList.map((tab) => `- ${tab.title}\n\t- ${tab.url}`).join("\n")
}
