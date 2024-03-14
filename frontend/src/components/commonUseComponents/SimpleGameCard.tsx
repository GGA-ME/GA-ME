import { motion } from 'framer-motion';

const SimpleGameCard = ({ imageUrl, title }) => {
    return (
        <motion.div
            className="w-48 rounded overflow-hidden shadow-lg transform cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className={`w-48 rounded overflow-hidden bg-gray-600 text-white text-center`}>
                <img src={imageUrl} alt={title} className="w-full" />
                <div className="p-1">
                    <h3 className="text-sm">{title}</h3>
                </div>
            </div>
        </motion.div>
    );
};

export default SimpleGameCard;