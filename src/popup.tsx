import { WordBox } from "~features/send-word-box"

import "~style.css"

function IndexPopup() {
  return (
    <div className="justify-center text-center">
      <div className="m-4 gap-4 justify-center">
        <a
          target="_blank"
          href="https://docs.google.com/spreadsheets/d/1VmmLd7JObkXyu0NKLz-ZcclLWce0VD03XXDrgWOM3Jo/edit#gid=0">
          スプレッドシートに移動
        </a>
      </div>
      <WordBox />
    </div>
  )
}

export default IndexPopup
