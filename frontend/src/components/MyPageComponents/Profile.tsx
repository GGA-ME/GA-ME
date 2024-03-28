import { useEffect, useState } from "react";
import detailStore, { Prefer, TagWeight } from "../../stores/myPageStore";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import GameCard from "../commonUseComponents/SimpleGameCard";

// const MyProfile = ({userId}: {userId: number}) => {
const MyProfile: React.FC = () => {
    const { data, loading, error, topTenTag, fetchData } = detailStore();
    const [userId] = useState(1);

    useEffect(() => {
        fetchData(userId);
    }, [fetchData, userId]);

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
                <div className="bg-gray-600 w-80 h-80 flex justify-center items-center">
                    <img className="rounded-full" src={data.result.userProfileImg} alt="" />
                    <p>{data.result.userName}</p>
                    {topTenTag.map((tag: TagWeight) => (
                        <span key={tag.codeId}>{tag.tagName}</span>
                    ))}
                    {data.result.preferList.map((prefer: Prefer, index: number) => (
                        <motion.div key={index}>
                            <GameCard                                
                                gameId={prefer.gameId}
                                imageUrl={prefer.gameHeaderImg}
                                title={prefer.gameName}
                            ></GameCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyProfile;