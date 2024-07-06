'use client'

import { useState } from "react";

import { TextBlock } from "@/components/TextBlock";
import { Floating, FloatingAddButton, FloatingSendButton } from "@/components/Floating";
import { SummarizeAPI } from "@/services/summarize";

export default function Home() {
  const [inputs, setInputs] = useState<string[]>(["", ""]);
  const [outputs, setOutputs] = useState<string[]>(["", ""]);

  const handleInputChange = (text: string, index: number) => {
    var updatedInputs = [...inputs];
    updatedInputs[index] = text;
    setInputs(updatedInputs);
  }

  const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>, onChange: (text: string, index: number) => void, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onChange(e.target?.result?.toString() || '', index);
      reader.readAsText(file);
    }
  }

  const handleAdd = () => {
    setInputs([...inputs, ""]);
    setOutputs([...outputs, ""]);
  }

  const handleDelete = (index: number) => {
    setInputs(inputs.filter((_, i) => i !== index));
    setOutputs(outputs.filter((_, i) => i !== index));
  }

  const handleSend = async (index: number) => {
    const req = {
      message: inputs[index],
    }
    const res = await SummarizeAPI.getOneSummarize(req);
    console.log(res);
    var updateOutputs = [...outputs]
    updateOutputs[index] = res['text'];
    setOutputs(updateOutputs);
  }

  const handleMassSend = async () => {
    const req = {
      message: inputs,
    }
    const res = await SummarizeAPI.getMassSummarize(req);
    console.log(res);
    var updateOutputs = [...outputs]
    updateOutputs = res['text'];
    setOutputs(updateOutputs);
  }

  return (
    <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200">
      {/* Title */}
      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold">Tóm tắt văn bản</div>
      </div>

      {inputs.map((input, index) => (
        <div key={index} className="mt-6 w-full">
          <div className="flex flex-rol justify-between space-x-5 pb-3">
            <div className="h-100 w-1/2 flex flex-col justify-center space-y-2">
              <TextBlock editable={true} text={input} onChange={(newText) => handleInputChange(newText, index)}/>
            </div>
            <div className="h-100 w-1/2 flex h-full flex-col justify-center space-y-2">
              <TextBlock editable={false} text={outputs[index]} />
            </div>
          </div>
          <input type="file" onChange={(e) => handleLoadFile(e, handleInputChange, index)}/>
          <button className="w-[140px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold mx-2 hover:bg-violet-600 active:bg-violet-700" onClick={() => handleSend(index)}>Tóm tắt</button>
          <button className="w-[140px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold mx-2 hover:bg-violet-600 active:bg-violet-700" onClick={() => handleDelete(index)}>Xoá</button>
        </div>
      )
      )}

      <Floating>
        <FloatingAddButton onClick={handleAdd} />
        <FloatingSendButton onClick={handleMassSend}/>
      </Floating>
      </div>
  );
}
