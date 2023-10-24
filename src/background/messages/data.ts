import type { PlasmoMessaging } from "@plasmohq/messaging"
// import { appendData } from "../index.ts"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    console.log(req)
    res.send({
        message: "Hello from message handler"
    })
}

export default handler
