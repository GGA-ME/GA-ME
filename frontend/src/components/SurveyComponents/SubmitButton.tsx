import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import detailStore from "../../stores/myPageStore";
import { surveyStore } from "../../stores/surveyStore";

const SubmitButton: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const { addLikeWeight } = detailStore();
    const {checkGameList} = surveyStore();
    
    const clickSubmit = () => {
        if(!user) {
            alert("유저 정보가 존재하지 않습니다.")
            navigate('/');
            throw new Error("유저 정보가 존재하지 않습니다.");
            
        }
        if(checkGameList[2].length === 0) return alert('게임을 최소 하나 이상 선택해주세요.');
        addLikeWeight(user.userId, checkGameList);
        navigate("/");
    }

    return (
        <>
            <button className=
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
                onClick={clickSubmit}
            >
                 Submit 
            </button>
        </>
    )
}

export {SubmitButton};