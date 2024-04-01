import { useEffect } from "react";
import { myPageStore, TagWeight } from "../../stores/myPageStore";
import { AxiosError } from "axios";
import LikeComponent from "./Like";
import StatisticsComponent from "./Statistics";
import useUserStore from "../../stores/userStore";

const MyProfile: React.FC = () => {
  const { data, loading, error, topTenTag, fetchData } = myPageStore();
  const {user} = useUserStore();
  console.log(`user`);
  console.log(user);
  console.log(`data`);
  console.log(data);
  // const { userId }: { userId?: string } = useParams<{ userId?: string }>();
    // userId가 undefined일 때의 처리
    // const userIdAsNumber: number = parseInt(userId);
    // console.log(userIdAsNumber); // userId를 number로 변환한 값 출력
  if(user){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      fetchData(user.userId);
    }, [fetchData, user.userId]);

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
  }
  /** 이미지가 없을때 처리도 해줘야됌 */
  return (
    <>
      <div className="relative z-1">
        <img className="rounded-full" src={data.result.userProfileImg} alt="" />
      </div>

      <div className="flex justify-center items-center h-screen mb-100">
        <div className="bg-stone-900 rounded-xl items-center" style={{ marginBottom: "10%", marginTop: "10%", padding: "10px" }}>
          <div className="rounded-2xl" style={{ padding: "20px", border: "3px solid white" }}>
            <p>{data.result.userName}</p>
            {topTenTag.map((tag: TagWeight, index: number) => (
              <span key={index} className="mr-4 mb-3 rounded " style={{ backgroundColor: "#036280", border: "#036280", color: "white" }}>
                #{tag.tagName}{" "}
              </span>
            ))}
            <br />
            <br />
            <hr />
            <br />
            <LikeComponent />
            <div className="max-h-[700px]">
              <StatisticsComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
