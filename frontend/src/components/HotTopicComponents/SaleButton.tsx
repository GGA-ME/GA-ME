// import { motion } from 'framer-motion';
import style from './HotTopicButton.module.css'

const SaleButton: React.FC = () => {
    return (
        <button className={`${style.topicBtn}`}>
            <div className={`${style.container}`}>
                <img src="./HotTopicSaleIcon.png" />
                <p>세일</p>
            </div>
        </button>
    );
};

export default SaleButton;