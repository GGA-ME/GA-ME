import React from 'react';
import styles from './InfoGame.module.css';
import { Game } from '../../stores/DetailStore';

interface InfoGameProps {
    relatedGameList: Game[] | undefined;
  }
  
  const InfoGame: React.FC<InfoGameProps> = ({ relatedGameList }) => {
  return (
    <>
    <div className={styles.container}>
    <div>연관 게임</div>
    </div>
    </>
  );
};

export default InfoGame;
