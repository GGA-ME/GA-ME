import { useEffect, useState } from "react";
import detailStore, { Prefer, TagWeight } from "../../stores/myPageStore";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import GameCard from "../commonUseComponents/SimpleGameCard";

// const MyProfile = ({userId}: {userId: number}) => {
const MyProfile = () => {
    console.log("12313")
    const {data, loading, error, topTenTag, sendFavoriteGameList, fetchData} = detailStore();
    const [userId] = useState(1);
    // const [stateData] = useState(data);
    console.log(userId);
    useEffect(() => {
        fetchData(userId);
    }, [fetchData]);

    sendFavoriteGameList();

    console.log(data);

    if(loading) {
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
            <div className="bg-gray-600 w-80 h-80 flex justify-center items-center">                
                <img className="rounded-full" src={data.result.userProfileImg} alt="" />
                <p>{data.result.userName}</p>
                { topTenTag.map((tag: TagWeight) => (
                    <button>{tag.tagName}</button>
                ))}
                { data.result.preferList.map((prefer: Prefer) => (
                <motion.ul>
                    <GameCard 
                        gameId={prefer.gameId}
                        imageUrl={prefer.gameHeaderImg}
                        title={prefer.gameName}
                    ></GameCard>
                </motion.ul>
                ))}
            </div>
        </div>
    </>
    )
}

export default MyProfile;