// MultiStepProgressBar.tsx

import React, { useState } from 'react';
import styles from './MultiProgressBar.module.css'; // 스타일 모듈 불러오기
import Lottie from 'react-lottie-player'
import lottieJson from './my-lottie.json'

const flexName = "justify-center ";

interface MultiStepProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const MultiStepProgressBar: React.FC<MultiStepProgressBarProps> = ({ currentStep, totalSteps }) => {

  const [step, setStep] = useState(1); // step 상태로 변경
  // const totalSteps = 3; // totalSteps는 props로 전달 받으므로 삭제

  const handleNextStep = () => {
    setStep(step + 1); // step 상태 업데이트
  };

  const handlePrevStep = () => {
    setStep(step - 1); // step 상태 업데이트
  };

  // 각 단계의 바의 색상을 계산하는 함수
  const calculateBarColor = (stepNumber: number): string => {
    if (stepNumber < currentStep) {
      return 'bg-green-500'; // 완료된 단계는 녹색으로 표시
    } else if (stepNumber === currentStep) {
      return '#FFD700'; // 진행 중인 단계는 노란색으로 표시
    } else {
      return '#808080'; // 미완료된 단계는 회색으로 표시
    }
  };
  console.log(calculateBarColor(1));

  return (
    <div>
        <div className={flexName + styles.progressBar}  >
            {/* <button style={{backgroundColor: calculateBarColor(1)}}>색깔을 정해줘라</button> */}
            {/* Step 1 */}
            <div className={styles.step}>
                {step > 1 }
                <div className={styles.progress + {backgroundColor: calculateBarColor(1)}} >1</div>
                
            </div>
            {/* Line 1 */}
            {step > 1 && <div className={styles.line}></div>}
            
            {/* Step 2 */}
            <div className={styles.step}>
                {step > 2 && <div className={styles.progress} style={{ backgroundColor: calculateBarColor(2) }}></div>}
                2
            </div>
            {/* Line 2 */}
            {step > 2 && <div className={styles.line}></div>}

            {/* Step 3 */}
            <div className={styles.step}>
                {step > 3 && <div className={styles.progress} style={{ backgroundColor: calculateBarColor(3) }}></div>}
                3
            </div>
        </div>
        <div>
             {/* Next and Previous buttons */}
            {step > 1 && (
            <button onClick={handlePrevStep}>Previous</button>
            )}
            {step < totalSteps && (
            <button onClick={handleNextStep}>Next</button>
            )}
        </div>
    </div>
  );
};

export default MultiStepProgressBar;
