// import { motion } from 'framer-motion';
import style from './HotTopicButton.module.css'

const NewsButton: React.FC = () => {
    return (
        <button className={`${style.topicBtn}`}>
            <div className={`${style.container}`}>
                <img src="./HotTopicNewsIcon.png" />
                <p>뉴스</p>
            </div>
        </button>
    );
};

export default NewsButton;