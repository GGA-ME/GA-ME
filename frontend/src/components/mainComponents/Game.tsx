import GameCard from '../commonUseComponents/GameCard'
import { motion } from 'framer-motion'

function Game() {
    const gameCards = Array.from({ length: 20 }, (_, index) => (
        <GameCard
          key={index}
          imageUrl="/Gameicon.gif"
          title="ELDEN RING"
          price="₩ 64,800"
        />
      ));

    return (
        
        <div className="grid grid-cols-4 gap-4">
        {gameCards}
      </div>
      );
    }
    export default Game;