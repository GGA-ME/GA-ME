import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import {myPageStore} from "../../stores/myPageStore";
import { surveyStore } from "../../stores/surveyStore";
import { useState } from "react";

interface StepProps{
    current: number;
}


const SubmitButton: React.FC<StepProps> = ({current}) => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const { addLikeWeight } = myPageStore();
    const {checkGameList} = surveyStore();

    const [step, setStep] = useState(current);

    console.log(step);
    
    const clickSubmit = () => {
        if(!user) {
            alert("유저 정보가 존재하지 않습니다.")
            navigate('/');
            throw new Error("유저 정보가 존재하지 않습니다.");            
        }       
        
        addLikeWeight(user.userId, checkGameList);
        // 라엘아 여기에 좋아요 로그 남겨줘
        navigate("/");
    }

    const nextClick = () => {
        setStep(step + 1); // 상태 업데이트
    }

    const prevClick = () => {
        setStep(step - 1); // 상태 업데이트
    }

    if(current == 2){
        return (
            <>
            <button className=
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
                onClick={prevClick}
            >
                 Prev 
            </button>
                <button className=
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
                onClick={clickSubmit}
            >
                 Submit 
            </button>
            </>
        )
    }

    if(current == 1){
        return(
            <>
                <button className=
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
                onClick={prevClick}
            >
                 Prev 
            </button>
                <button className=
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
                onClick={nextClick}
            >
                 Next 
            </button>
            </>
        )
    }

    if(current == 0){
        return(
            <>
                <button className=
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
                onClick={nextClick}
            >
                 Next 
            </button>
            </>
        )
    }
}

export {SubmitButton};