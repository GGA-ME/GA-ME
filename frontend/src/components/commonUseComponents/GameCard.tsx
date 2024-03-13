import { motion } from 'framer-motion'
import style from './GameCard.module.css'


const GameCard = ({ imageUrl, title, price }) => {
    return (
        <motion.div 
        initial={{ x: -60 }} // Start position off-screen to the left
        animate={{ x: 0 }} // End at the natural position
        transition={{ duration: 0.3 }} // Duration of the animation
        whileHover={{
          scale: [null, 1.4, 1.2],
          transition: { duration: 0.3 },
        }}
      >
      <div className={`${style.card} w-48 rounded overflow-hidden text-white text-center`}>
        <img src={imageUrl} alt={title} className="w-full" />
        <div className="p-2">
          <h3 className="text-lg">{title}</h3>
          <p className="text-sm">{price}</p>
        </div>
      </div>
      </motion.div>
    );
  };
  
  export default GameCard;