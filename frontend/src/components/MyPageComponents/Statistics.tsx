import detailStore from "../../stores/myPageStore";

const statisticsComponent: React.FC = () =>  {
    const { topTenTag } = detailStore();
    // console.log(topTenTag);

    const userTagWeights: number[] = topTenTag.map((item) => item.userTagWeight);
    const userGameName: string[] = topTenTag.map((item) => item.tagName);

    const options = {
        series: userTagWeights,
        dataLabels: {
            enabled: true,
            formatter: function(val: number){
                return val + '%';
            }
        },
        chartOptions: {
            userGameName
        },
        chart: {type: 'donut'}
    }
    
    const chart = new ApexCharts(document.getElementById('chart'), options);
    console.log(chart)
    chart.render();
    return(
        <>
            <h1>통계 컴포넌트!</h1>
            <div id="chart">나와줘라 진짜 제발</div>
        </>
    )
}

export default statisticsComponent;