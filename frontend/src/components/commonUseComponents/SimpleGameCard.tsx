import { motion } from 'framer-motion';


// 타입스크립트 타입 프롭받을 타입 정의
export interface SimpleGameCardProps {
    imageUrl: string;
    title: string | JSX.Element;
    gameId: number;
  }

const SimpleGameCard: React.FC<SimpleGameCardProps> = ({ imageUrl, title }) => {
    return (
        <motion.div
            className="w-48 rounded overflow-hidden shadow-lg transform cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className={`w-48 rounded overflow-hidden bg-gray-600 text-white text-center`}>
                <img src={imageUrl} className='object-cover w-50 h-50'  style={{width: '192px', height: '110px' , objectFit :'cover'  }}/>
                <div className="p-1">
                    <h3 className="text-sm">{title}</h3>
                </div>
            </div>
        </motion.div>
    );
};

export default SimpleGameCard;