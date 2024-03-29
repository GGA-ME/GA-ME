import detailStore, { Prefer } from "../../stores/myPageStore";
import { motion } from "framer-motion";
import GameCard from "../commonUseComponents/SimpleGameCard";

const LikeComponent: React.FC = () => {
    const { data } = detailStore();

    return (
        <>
            {data.result.preferList.map((prefer: Prefer, index: number) => (
                        <motion.div key={index}>
                            <GameCard                                
                                gameId={prefer.gameId}
                                imageUrl={prefer.gameHeaderImg}
                                title={prefer.gameName}
                            ></GameCard>
                        </motion.div>
                    ))}
        </>
    )
}

export default LikeComponent;