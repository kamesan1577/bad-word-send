import { Button } from "@material-tailwind/react/"
import React, { useState } from "react"

import { usePort } from "@plasmohq/messaging/hook"

export const WordBox = () => {
  const mailPort = usePort("mail")
  const [data, setData] = useState({
    見出し: "",
    読み方: "",
    言い換え語: "",
    備考: ""
  })
  const handleDataChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const dataInput = (key: string) => {
    return (
      <div className=" relative h-10 m-2 w-full min-w-[200px]">
        <input
          type="text"
          onChange={(e) => {
            handleDataChange(key, e.target.value)
          }}
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
        />
        <label
          htmlFor="word"
          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          {key}
        </label>
      </div>
    )
  }

  return (
    <div className="flex m-4 gap-4">
      <form>
        {Object.keys(data).map((key, index) => (
          <div className="flex justify-content-center" key={index}>
            {dataInput(key)}
          </div>
        ))}
        <Button
          onClick={async () => {
            mailPort.send({
              data: data
            })
          }}
          className="mt-2">
          送信
        </Button>
      </form>
    </div>
  )
}
