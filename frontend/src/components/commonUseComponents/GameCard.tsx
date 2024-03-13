import { motion } from 'framer-motion'
import style from './GameCard.module.css'


const GameCard = ({ imageUrl, title, price }) => {
    return (
      <div className={`${style.card} w-48 rounded overflow-hidden text-white text-center`}>
        <img src={imageUrl} alt={title} className="w-full" />
        <div className="p-2">
          <h3 className="text-lg">{title}</h3>
          <p className="text-sm">{price}</p>
        </div>
      </div>
    );
  };
  
  export default GameCard;