import { useEffect } from "react";
import detailStore, { Prefer, TagWeight } from "../../stores/myPageStore";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import GameCard from "../commonUseComponents/SimpleGameCard";
import useUserStore from "../../stores/userStore";

// const MyProfile = ({userId}: {userId: number}) => {
const MyProfile: React.FC = () => {
    const { data, loading, error, topTenTag, fetchData } = detailStore();
    const {user} = useUserStore();

    if(!user) throw new Error("유저 정보가 없습니다.")

    useEffect(() => {
        fetchData(user.userId);
    }, [fetchData, user]);


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
                    {topTenTag.map((tag: TagWeight, index: number) => (
                        <span key={index}>{tag.tagName}</span>
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