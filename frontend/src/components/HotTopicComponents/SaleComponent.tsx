import { useEffect, useState } from 'react';
import style from './SaleComponent.module.css'
import SalesList from './SalesList';
import useHotTopicStore from "../../stores/hotTopicStore";

const SaleComponent: React.FC = () => {
    const { saleData, saleData10, saleData30, saleData50, saleData75, fetchSalesData } = useHotTopicStore();
    const [selectedRange, setSelectedRange] = useState('10-30'); // 선택된 할인 범위 상태

    useEffect(() => {
        if (saleData == null) {
            fetchSalesData(); // 초기 렌더링 시에만 실행됨            
        }
    }, []);

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRange(event.target.value);
    };

    return (
        <div>
            <div className={`${style.select}`}>
                {/* 라디오 버튼 */}
                <input type="radio" id="select" name="shop" value="10-30" checked={selectedRange === '10-30'} onChange={handleRangeChange} />
                <label htmlFor="select"># 10% ~ 30% </label>
                <input type="radio" id="select2" name="shop" value="30-50" checked={selectedRange === '30-50'} onChange={handleRangeChange} />
                <label htmlFor="select2"># 30% ~ 50% </label>
                <input type="radio" id="select3" name="shop" value="50-75" checked={selectedRange === '50-75'} onChange={handleRangeChange} />
                <label htmlFor="select3"># 50% ~ 75% </label>
                <input type="radio" id="select4" name="shop" value="75-" checked={selectedRange === '75-'} onChange={handleRangeChange} />
                <label htmlFor="select4"># 75% ~</label>
            </div>
            <div>
                {/* 선택된 범위에 따라 해당하는 SalesList 컴포넌트를 렌더링 */}
                {selectedRange === '10-30' && (
                    <>
                        <h1 className={`${style.title}`}> 10% ~ 30% 할인 소식</h1>
                        <SalesList cardDtoList={saleData10 || []} />
                    </>
                )}
                {selectedRange === '30-50' && (
                    <>
                        <h1 className={`${style.title1}`}> 30% ~ 50% 할인 소식</h1>
                        <SalesList cardDtoList={saleData30 || []} />
                    </>
                )}
                {selectedRange === '50-75' && (
                    <>
                        <h1 className={`${style.title2}`}> 50% ~ 75% 할인 소식</h1>
                        <SalesList cardDtoList={saleData50 || []} />
                    </>
                )}
                {selectedRange === '75-' && (
                    <>
                        <h1 className={`${style.title3}`}> 75% ~ 할인 소식</h1>
                        <SalesList cardDtoList={saleData75 || []} />
                    </>
                )}
            </div>
        </div>
    );
};

export default SaleComponent;
