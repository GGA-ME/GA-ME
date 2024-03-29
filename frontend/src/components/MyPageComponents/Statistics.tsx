import detailStore from "../../stores/myPageStore";

interface opts {
    seriesIndex: number;
}

const statisticsComponent: React.FC = () =>  {
    const { data, topTenTag } = detailStore();

    const userTagWeights: number[] = topTenTag.map((item) => item.userTagWeight);
    const userGameName: string[] = topTenTag.map((item) => item.tagName);
    const otherWeight: number[] = data.result.tagWeightList.map((item) => item.userTagWeight);

    // 유저가 선호하는 태그를 제외한 나머지의 모든 합
    userTagWeights.push(0);
    userGameName.push('Others');
    for(let i = 9; i < otherWeight.length; i++) userTagWeights[userTagWeights.length-1] += otherWeight[i];

    const options = {
        series: userTagWeights,
        chart: {
            width: 500,
            type: 'donut',
            foreColor: 'f9fafb',
          },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270
            }
        },
        
        dataLabels: {
            enabled: true,
            // 두번째 파라미터가 index를 가지고 있음
            formatter: function (val: number) {    
                return `${Math.ceil(val)}%` ;
            },
        },
        fill: {
            type: 'gradient',
            
        },
        legend: {
            // dataLabels와 다르게 _val은 퍼센테이지가 아니라 series-index가 나옴
            // opts의 seriesIndex를 이용해서 legend 정의
            formatter: function(_val: number, opts: opts) {
                return `${userGameName[opts.seriesIndex]}` ;
            },
        },
        // labels: {colors: '#f9fafb', useSeriesColors: true},        
        title: {
            text: 'Gradient Donut with custom Start-angle',
            style: {
                color: '#f9fafb',
            }
        },
        responsive: [{
            breakpoint: 480,
            options: { chart: { width: 200 }, legend: { position: 'bottom'}}
        }],            
        noData: {text: 'Loading...'},
    }
    
    const chart = new ApexCharts(document.getElementById('chart'), options);

    const renderingStart = () => {
        chart.render();
    }    
    return(
        <>
            <div id="chart" >
                <button type="button" onClick={renderingStart}> 차트 생성하기</button>
            </div>
        </>
    )
}

export default statisticsComponent;