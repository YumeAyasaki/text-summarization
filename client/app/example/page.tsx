'use client';

import { useState, useEffect } from 'react';

import Table from './table';
import { ExampleAPI } from '@/services/example';
import { Data, Information } from '@/constants/interface';

export default function Example() {
  const [data, setData] = useState<Data>({
    idx: [],
    text: [],
    summary: [],
  });
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isDetailedModal, setIsDetailedModal] = useState<boolean>(false);
  const [detailedInformation, setDetailedInformation] = useState<Information>({
    index: -1,
    text: '',
    summary: '',
  });
  const [input, setInput] = useState<number>(0);

  const handleClick = () => {
    setIsModal(!isModal);
  };

  const handleSend = async () => {
    const req = {
      idx: input,
    };
    const res = await ExampleAPI.getRelate(req);
    let newRes = [].concat(...res);
    if (newRes.length > 50) {
      newRes = newRes.slice(0, 50);
    }
    const afterReq = {
      number: newRes.length,
      sample: newRes,
    };
    const afterRes = await ExampleAPI.getData(afterReq);
    setData(afterRes);
    setIsModal(false);
  };

  useEffect(() => {
    const getIntialData = async () => {
      const req = {
        number: 10,
        sample: [],
      };
      const res = await ExampleAPI.getData(req);
      setData(res);
    };
    getIntialData();
  }, []);

  return (
    <div className='flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200'>
      {/* Title */}
      <div className='mt-10 flex flex-col items-center justify-center'>
        <div className='mt-3 text-4xl font-bold'>Example</div>
      </div>
      <button
        className='mt-3 rounded-md bg-violet-500 px-4 py-2 text-white hover:bg-violet-700'
        onClick={handleClick}
      >
        Get alike text
      </button>
      <div className='mt-3'>
        <Table
          data={data}
          modalMethod={() => setIsDetailedModal(true)}
          informationMethod={(e) => setDetailedInformation(e)}
        />
      </div>
      {isModal && (
        <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50'>
          <div className='h-[650px] w-[500px]'>
            <div className='h-full w-full rounded-md bg-white p-2'>
              <input
                value={input}
                onChange={(e) => setInput(parseInt(e.target.value))}
                type='number'
                className='ml-2 w-full rounded-md border border-gray-300 px-2 py-1 text-black focus:outline-none focus:ring-1 focus:ring-violet-500'
              />
              <button
                onClick={handleSend}
                className='mr-3 mt-4 rounded-md bg-violet-500 px-4 py-2 text-white hover:bg-violet-700'
              >
                Send
              </button>
              <button
                onClick={handleClick}
                className='mt-4 rounded-md bg-violet-500 px-4 py-2 text-white hover:bg-violet-700'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isDetailedModal && (
        <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50'>
          <div className='h-[75%] w-[75%]'>
            <div className='h-full w-full overflow-auto rounded-md bg-white p-2'>
              <div className='flex flex-col space-y-2'>
                <p className='text-base font-light text-black'>
                  Index: {detailedInformation.index}
                </p>
                <p className='text-base leading-loose text-black'>
                  {detailedInformation.text}
                </p>
                <p className='text-base text-black'>
                  Summary: {detailedInformation.summary}
                </p>
              </div>

              <button
                onClick={() => setIsDetailedModal(false)}
                className='mt-4 rounded-md bg-violet-500 px-4 py-2 text-white hover:bg-violet-700'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
