import '@picocss/pico/css/pico.min.css';
import { getFormattedTitleAndURL } from '~lib/getTabsInfo';
import { validFilename } from '~lib/validFilename';
import "../style/style.css";

import { useState } from "react";
import { MESSAGE_TEXTS, PAGE_TEXTS } from '~config/parameter';
import { copyToClipboard } from '~lib/copyToClipboard';
import { exportToMarkDown } from '~lib/exportToMarkdown';

const IndexPopup = () => {
  const [message, setMessage] = useState(MESSAGE_TEXTS.default)
  const [inputData, setInputData] = useState("")

  const handleChange = (e: {target : HTMLInputElement}) => {
    setInputData(e.target.value)
  }
  const handleClickCopyButton = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const formattedTitleAndURL: string = await getFormattedTitleAndURL()
    const result: boolean = await copyToClipboard({ text: formattedTitleAndURL })
    setMessage(result ? MESSAGE_TEXTS.copy.success : MESSAGE_TEXTS.copy.failure)
  }

  const handleClickExportButton = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const isValidFilename: boolean = validFilename({filename: inputData})
    if (isValidFilename) {
      const formattedTitleAndURL: string = await getFormattedTitleAndURL()
      await exportToMarkDown({title: inputData, content: formattedTitleAndURL})
    }
    setMessage(isValidFilename ? MESSAGE_TEXTS.export.success : MESSAGE_TEXTS.export.failure)
  }

  return (
    <>
      <hgroup className='header-box '>
        <h4>{PAGE_TEXTS.header}</h4>
      </hgroup>
      <div className='grid container'>
        <div className='message'>{message}</div>
        <div className='copy-button'>
          <button className='secondary' onClick={handleClickCopyButton}>{PAGE_TEXTS.button.copy}</button>
        </div>
        <div className='input-form'>
          <input
            type="text"
            name="text"
            placeholder={PAGE_TEXTS.input.placeholder}
            aria-label="Text"
            value={inputData}
            onChange={handleChange}/>
        </div>
        <div className='export-button'>
          <button onClick={handleClickExportButton}>{PAGE_TEXTS.button.export}</button>
        </div>
      </div>
    </>
  )
}

export default IndexPopup
