import { useEffect } from "react";
import detailStore, { TagWeight } from "../../stores/myPageStore";
import { AxiosError } from "axios";
import LikeComponent from "./Like";
import StatisticsComponent from "./Statistics";
import useUserStore from "../../stores/userStore";

const MyProfile: React.FC = () => {
  const { data, loading, error, topTenTag, fetchData } = detailStore();
  const {user} = useUserStore();

  useEffect(() =>{
      if(user)
          fetchData(user.userId);
          },[fetchData, user]);

  if (loading) {
    return (
      <button type="button" className="bg-indigo-500 ..." disabled>
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          Processing...
        </svg>
      </button>
    );
  }
  if (error) {
    const axiosError = error as AxiosError;
    return <div>Error: {axiosError.message}</div>;
  }

  /** 이미지가 없을때 처리도 해줘야됌 */
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-600 rounded-xl items-center" style={{margin: '50px', padding: '20px', }}>
          <img
            className="rounded-full"
            src={data.result.userProfileImg}
            alt=""
          />
          <p>{data.result.userName}</p>
          {topTenTag.map((tag: TagWeight, index: number) => (
            
            <span key={index} className="mr-4 mb-3 rounded bg-indigo-700 border-2 border-stone-950" >#{tag.tagName}  </span>
          ))}
          <br />
          <br />
          <hr />
          <br />
            <LikeComponent />      
          
          <div className="flex flex-col items-center">
                  
            <StatisticsComponent />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default MyProfile;
