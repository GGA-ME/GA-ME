import { useEffect } from "react";
import { surveyStore } from "../../stores/surveyStore";
import { AxiosError } from "axios";
import { motion } from 'framer-motion';
import SimpleGameCard from "../commonUseComponents/SimpleGameCard";

interface ChoiceGame{
    gameId: number;
    gameChoiceName: string;
    gameHeaderImg: string;
}

const SurveyGame = () => {
    const { data, loading, error, fetchData } = surveyStore();
    useEffect(() => {
      fetchData(); // 마운트시 데이터 가져오기
    }, [fetchData]); // 데이터 변경시 재랜더링
    // 이 시점에 data에 정보가 들어와있음

    if (loading) {
      return (
      <button type="button" className="bg-indigo-500 ..." disabled>
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">Processing...</svg>
        
      </button>
      )
    }
    
    if (error) {
      const axiosError = error as AxiosError;
      return <div>Error: {axiosError.message}</div>;
    }

    if (!data || !data.result.length) {
        return <div>No data available</div>;
    }

    return (
      <>
        <div className="bg-stone-900">
            <div className="grid grid-cols-4 gap-4">
              {data.result.map((choiceGame: ChoiceGame ,index: number) => (
                <motion.li key={index} className="list-none"
                  variants={{
                    hidden: { x: -60, opacity: 0 },
                    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
                  }}
                  >
                <SimpleGameCard 
                        key={index}
                        imageUrl={choiceGame.gameHeaderImg}
                        title={choiceGame.gameChoiceName}           
                  />
                </motion.li>
              ))}
            </div>
        </div>
    </>
  );
}

export default SurveyGame;

