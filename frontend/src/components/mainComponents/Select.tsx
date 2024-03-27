import React, { useState }  from 'react'
import style from './Select.module.css'


const Select: React.FC = () => {
  const categorys = ['전체 인기', '취향 저격']
  const [nowCategory, setNotCategory] = useState<string>('ALL')
  const allTags = [ '액션', '전략', 'RPG', '캐주얼', '레이싱', '스포츠', '인디', '어드벤처']
  const myTags = [ 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ' ]
  const [selectedTagId, setSelectedTagId] = useState<string>('');
  return (
    <>
    <div className="flex space-x-2 p-4">
      {categorys.map((category:string, index:number) => (
        <button
          key={index}
          className={`px-3 py-1 rounded-full border-2 border-transparent text-3xl   ${
            nowCategory === category ? `text-white ${style.neonNormal}` : 'text-gray-500 hover:bg-gray-300'
          }`}
          onClick={() => setNotCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
    <div className="flex space-x-2 p-4">
      {nowCategory === "ALL" ? allTags.map((tag: string, index: number) => (
        <button
          key={index}
          className={`ml-6 px-3 py-1 rounded-full border-2 border-transparent  ${
            selectedTagId === tag ? `text-white ${style.neonNormal}` : 'text-gray-500 hover:bg-gray-300'
          }`}
          onClick={() => setSelectedTagId(tag)}
        >
          {tag}
        </button>
      )) : nowCategory === "맞춤" ? myTags.map((tag: string, index: number) => (
        <button 
          key={index}
          className={`ml-6 px-3 py-1 rounded-full border-2 border-transparent ${
            selectedTagId === tag ? `text-white ${style.neonNormal}` : 'text-gray-500 hover:bg-gray-300'
          }`}
          onClick={() => setSelectedTagId(tag)}
        >
          {tag}
        </button>
      )) : null}
    </div>
    </>
  );
};

export default Select;