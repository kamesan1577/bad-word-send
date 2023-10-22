import { CountButton } from "~features/count-button"
import { WordBox } from "~features/send-word-box"

import "~style.css"

function IndexPopup() {
  return (
    <div className="flex justify-center text-center">
      <WordBox />
      {/* <CountButton /> */}
    </div>
  )
}

export default IndexPopup
