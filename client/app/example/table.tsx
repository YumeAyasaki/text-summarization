import Image from 'next/image';

import { Data, Information } from '@/constants/interface';
import CopySVG from '@/assets/copy.svg';
import DetailSVG from '@/assets/detai.svg';
import { NLUAPI } from '@/services/nlu';

interface Props {
  data: Data;
  modalMethod: () => void;
  informationMethod: (e: Information) => void;
}

const MyTable = ({ modalMethod, informationMethod, data }: Props) => {
  const idx = data['idx'];
  const text = data['text'];
  const summary = data['summary'];

  const handleClick = (index: number) => {
    modalMethod();
    informationMethod({
      index: idx[index],
      text: text[index],
      summary: summary[index],
    });
  };

  const handleCopyHiddenState = async (text: string) => {
    const req = {
      message: text,
    };
    const res = await NLUAPI.getNLU(req);
    navigator.clipboard.writeText(res.hidden_state.toString());
  };

  return (
    <table className='w-full table-auto border-collapse border'>
      <thead>
        <tr className='bg-gray-100 text-left text-black'>
          <th className='border border-gray-200 bg-gray-100 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
            Index
          </th>
          <th className='border border-gray-200 bg-gray-100 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
            Text
          </th>
          <th className='border border-gray-200 bg-gray-100 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
            Summarization
          </th>
          <th className='border border-gray-200 bg-gray-100 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
            Hidden State
          </th>
        </tr>
      </thead>
      <tbody>
        {idx.map((item, index) => (
          <tr key={index} className='border border-gray-200'>
            <td className='px-4 py-2'>{item}</td>
            <td className='px-4 py-2'>
              <span className='line-clamp-5 overflow-hidden text-left'>
                {text[index]}
              </span>
            </td>
            <td className='px-4 py-2'>
              <span className='line-clamp-5 overflow-hidden text-left'>
                {summary[index]}
              </span>
            </td>
            <td className='flex flex-shrink flex-col items-center justify-center px-4 py-2'>
              <button className='m-1 bg-violet-500 p-1 hover:bg-violet-700'>
                <Image
                  alt='Copy'
                  src={CopySVG}
                  width={24}
                  height={24}
                  onClick={() => handleCopyHiddenState(text[index])}
                />
              </button>
              <button className='m-1 bg-violet-500 p-1 hover:bg-violet-700'>
                <Image
                  alt='More detail'
                  src={DetailSVG}
                  width={24}
                  height={24}
                  onClick={() => handleClick(index)}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyTable;
