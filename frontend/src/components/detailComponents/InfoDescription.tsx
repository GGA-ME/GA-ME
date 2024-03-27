import React from 'react';
import styles from './InfoDescription.module.css';

interface InfoDescriptionProps {
    gameDetailedDescription: string;
  }
  
  const InfoDescription: React.FC<InfoDescriptionProps> = ({ gameDetailedDescription }) => {
  return (
    <>
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} 
      dangerouslySetInnerHTML={{ __html: gameDetailedDescription }} />
    </div>
    </>
  );
};

export default InfoDescription;
