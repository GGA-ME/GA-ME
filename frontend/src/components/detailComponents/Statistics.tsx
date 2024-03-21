import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Statistics: React.FC = () => {
    const series = [{
        name: "sales",
        data: [{
            x: '1',
            y: 400
        }, {
            x: '2',
            y: 430
        }, {
            x: '3',
            y: 448
        }, {
            x: '4',
            y: 870
        }, {
            x: '5',
            y: 540
        }, {
            x: '6',
            y: 580
        }, {
            x: '7',
            y: 690
        }, {
            x: '8',
            y: 690
        }, {
            x: '9',
            y: 690
        }, {
            x: '10',
            y: 690
        }]
    }];

    // 가장 높은 값 찾기
    const maxY = Math.max(...series[0].data.map(item => item.y));

    // 각 막대의 색상 결정
    const barColors = series[0].data.map(item => item.y === maxY ? '#8B00FF' : '#008FFB');

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar',
            height: 380,
        },
        xaxis: {
            type: 'category',
            labels: {
                formatter: function (val) {
                    return val + '밑에 기준값';
                }
            }
        },
        plotOptions: {
            bar: {
                distributed: true // 각 막대별로 다른 색상 적용
            }
        },
        colors: barColors,
        title: {
            text: 'Grouped Labels on the X-axis',
        },
        tooltip: {
            x: {
                formatter: function (val) {
                    return val + '호버시보이는 글';
                }
            }
        },
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={380} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default Statistics;