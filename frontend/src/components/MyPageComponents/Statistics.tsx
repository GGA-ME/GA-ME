import detailStore from "../../stores/myPageStore";

const statisticsComponent: React.FC = () =>  {
    const { topTenTag } = detailStore();
    console.log(topTenTag);
    
    return(
        <>
            <h1>통계 컴포넌트!</h1>
        </>
    )
}

export default statisticsComponent;