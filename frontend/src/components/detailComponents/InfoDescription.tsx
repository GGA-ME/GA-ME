import React from 'react';
import styles from './InfoDescription.module.css';

interface InfoDescriptionProps {
    gameDetailedDescription: string;
  }
  
  const InfoDescription: React.FC<InfoDescriptionProps> = ({ gameDetailedDescription }) => {
  return (
    <>
    <div className={styles.container}>
    <div>{gameDetailedDescription}</div>
    </div>
    </>
  );
};

export default InfoDescription;
