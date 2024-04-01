// import { myPageStore } from "../../stores/myPageStore";
// import { AxiosError } from "axios";
// // import LikeComponent from "./Like";
// // import StatisticsComponent from "./Statistics";
// import styles from "./MyPage.module.css";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import useUserStore from "../../stores/userStore";

const MyProfile: React.FC = () => {
  console.log("도대체 이게 뭔데...?");
  // const {user} = useUserStore();
  // const { userId }: { userId?: string } = useParams<{ userId: string }>();
  // const { data, topTenTag } = myPageStore();

  // const userIdAsNumber: number = parseInt(userId);
  //  eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   fetchData(userIdAsNumber);
  // }, [fetchData, userIdAsNumber]);
  // console.log(data);



  
  // console.log("Profile Component에서 출력한 USER!!");
  // console.log(user);
  // console.log("TopTenTag!!");
  // console.log(topTenTag);
  // console.log('This is Data');
  // console.log(data);


  return (
    <>
      <h1>테스트 중입니다!</h1>
    </>
  )
  // if (userId) {
  //   const userIdAsNumber: number = parseInt(userId);
  //   console.log("Profile Component에서 출력한 USER!!");
  //   console.log(user);
  //   console.log("TopTenTag!!");
  //   console.log(topTenTag);
  //   // console.log(userIdAsNumber);
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useEffect(() => {
  //     fetchData(userIdAsNumber);
  //   }, [fetchData, userIdAsNumber]);
  //   console.log(data);

  //   if (loading) {
  //     return (
  //       <button type="button" className="bg-indigo-500 ..." disabled>
  //         <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
  //           Processing...
  //         </svg>
  //       </button>
  //     );
  //   }
  //   if (error) {
  //     const axiosError = error as AxiosError;
  //     return <div>Error: {axiosError.message}</div>;
  //   }
  //   return (
  //     <>
  //       <div className="relative " style={{ bottom: "10px", left: "30px" }}>
  //         <img
  //           className=" rounded-full"
  //           // src={data.result.userProfileImg}
  //           alt="This Is Img"
  //         />
  //       </div>

  //       <div className="flex justify-center items-center h-screen">
  //         <div
  //           className="bg-stone-900 rounded-xl items-center"
  //           style={{
  //             marginBottom: "10%",
  //             marginTop: "15%",
  //             padding: "10px",
  //             maxHeight: "850px",
  //             maxWidth: "900px",
  //           }}
  //         >
  //           <div
  //             className="rounded-2xl"
  //             style={{ padding: "40px", border: "3px solid white" }}
  //           >
  //             <div className={`${styles.userName}`}>{data.result.userName}</div>
  //             {/* {topTenTag.map((tag: TagWeight, index: number) => (
  //               <span
  //                 key={index}
  //                 className="bg-tag-gray inline-block px-2 py-1 rounded-[3px] ml-3"
  //                 style={{ backgroundColor: "#036280" }}
  //               >
  //                 #{tag.tagName}{" "}
  //               </span>
  //             ))} */}
  //             <br />
  //             <br />
  //             <hr />
  //             <br />
  //             <h1 className="text-xl font-bold">선호 게임 🤍</h1>
  //             <br />
  //             {/* <LikeComponent />
  //             <StatisticsComponent /> */}
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
};

export default MyProfile;
