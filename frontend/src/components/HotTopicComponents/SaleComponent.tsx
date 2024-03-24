import { useEffect } from 'react';
import style from './SaleComponent.module.css'
import SalesList from './SalesList';
import useHotTopicStore from "../../stores/hotTopicStore";

const SaleComponent: React.FC = () => {
    const {saleData,saleData10,fetchSalesData } = useHotTopicStore();
    useEffect(() => {
        fetchSalesData(); // 초기 렌더링 시에만 실행됨
      }, []); 
    return (
        <div> 
            <h1 className={`${style.title}`}> 10% ~ 30% 할인 소식</h1>
            <SalesList 
                cardDtoList={saleData10||[]}
            />
        </div>
        
    );
};

export default SaleComponent;