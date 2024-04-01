import React, { useState, useEffect } from 'react'
import {myPageStore, TagWeight } from '../../stores/myPageStore'
import useUserStore from '../../stores/userStore';
import useStoreMain from '../../stores/mainStore';
import Swal from 'sweetalert2';
import style from './Select.module.css'

interface Tag {
  tagId: number;
  tagName: string;
  codeId: string;
}

const Select: React.FC = () => {

<<<<<<< c307b7f1de9ee1ef2792ef51e94a60ba621d0598
  const { data, fetchData } = useMyPageStore()  // 유저기반 태그 가져오는 스토어
  const { user, isLoggedIn } = useUserStore();  // 유저의 유저ID가져오는 스토어
  const { setUserId, setTagId, setCodeId, fetchMainData, setPage } = useStoreMain(); // 게임리스트 상태를 바꾸기 위한 스토어
=======
  const { data, fetchData } = myPageStore()  // 유저기반 태그 가져오는 스토어
  const { user } = useUserStore();  // 유저의 유저ID가져오는 스토어
  const { setUserId, setTagId, setCodeId, fetchMainData } = useStoreMain(); // 게임리스트 상태를 바꾸기 위한 스토어
>>>>>>> 210cde9f0c9804ecde842c283896de6538b80c38

  useEffect(() => {
    if (user) { // user가 null이 아닐 때만 fetchData 호출
      fetchData(user.userId);
    } else {
      console.log('user 정보가 없습니다.');
    }
    fetchMainData()
  }, [user, fetchData, fetchMainData]);

  const userTags: TagWeight[] = data?.result.tagWeightList; // 유저기반 태그
  const defaultTags = [
    { "tagId": 1, "codeId": "GEN", "tagName": "액션" },
    { "tagId": 2, "codeId": "GEN", "tagName": "전략" },
    { "tagId": 3, "codeId": "GEN", "tagName": "RPG" },
    { "tagId": 4, "codeId": "GEN", "tagName": "캐주얼" },
    { "tagId": 9, "codeId": "GEN", "tagName": "레이싱" },
    { "tagId": 18, "codeId": "GEN", "tagName": "스포츠" },
    { "tagId": 23, "codeId": "GEN", "tagName": "인디" },
    { "tagId": 25, "codeId": "GEN", "tagName": "어드벤처" },
  ] // 전체게임 태그
  const categorys = ['전체 인기', '취향 저격']
  const [nowCategory, setNowCategory] = useState<string>('전체 인기') // 전체게임 or 맞춤게임 중 현재상태
  const [selectedTagName, setSelectedTagName] = useState<string | null>(null);  // 현재 선택된 tagWeightList

  // 전체 또는 취향 고를시 API요청
  const handleCategoryChange = (category: string) => {
    if (category === "취향 저격") {
      // 만약 카테고리를 취향저격을 골랐다면
      if (isLoggedIn) {
        setPage(1)
        setSelectedTagName(null)
        setTagId(0) // 태그와 코드 아이디를 0으로 초기화
        setCodeId('0')
        setNowCategory(category)
        setUserId(user?.userId ?? 0) // 유저아이디를 담아서 스토어에 전송 0일 경우도 있으므로 만약의경우0 넣기
        fetchMainData(); // 바뀐 값으로 메인데이터 다시 요청
      } else {
        Swal.fire({
          icon: 'error',
          title: '로그인 후 이용 가능합니다!',
          text: '로그인 후에 자신이 관심있는 태그의 게임을 찾아드려요.',
        });
      }
    } else if (category === "전체 인기") {
      setPage(1)
      setSelectedTagName(null)
      setTagId(0) // 태그와 코드 아이디를 0으로 초기화
      setCodeId('0')
      setNowCategory(category);
      setUserId(0)
      fetchMainData(); // 바뀐 값으로 메인데이터 다시 요청
    }
  };

  // 태그를 고를시 API요청
  const handleTagChange = (tag: Tag) => {
    setPage(1)
    setSelectedTagName(tag.tagName); // 태그 이름을 누른 태그로 지정
    setTagId(tag.tagId);
    setCodeId(tag.codeId);
    fetchMainData(); // Fetch data based on tagId and codeId
  }

  return (
    <>
      <div className="flex space-x-2 p-4">
        {categorys.map((category, index: number) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-full border-2 border-transparent text-3xl   ${nowCategory === category ? `text-white ${style.neonNormal}` : 'text-gray-500 hover:bg-gray-300'
              }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex space-x-2 p-4">
        {nowCategory === categorys[0] ? defaultTags.map((tag, index: number) => (
          <button
            key={index}
            className={`ml-6 px-3 py-1 rounded-full border-2 border-transparent  ${selectedTagName === tag.tagName ? `text-white ${style.neonNormal}` : 'text-gray-500 hover:bg-gray-300'
              }`}
            onClick={() => handleTagChange(tag)}
          >
            {tag.tagName}
          </button>
        )) : nowCategory === categorys[1] ? userTags.map((tag, index: number) => (
          <button
            key={index}
            className={`ml-6 px-3 py-1 rounded-full border-2 border-transparent ${selectedTagName === tag.tagName ? `text-white ${style.neonNormal}` : 'text-gray-500 hover:bg-gray-300'
              }`}
            onClick={() => handleTagChange(tag)}
          >
            {tag.tagName}
          </button>
        )) : null}
      </div>
    </>
  );
};

export default Select;