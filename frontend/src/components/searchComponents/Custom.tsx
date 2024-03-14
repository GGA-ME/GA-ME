
import { motion } from 'framer-motion'
import style from './GameCard.module.css'
import { useState } from 'react';
import SimpleGameCard from '../commonUseComponents/SimpleGameCard';


const Custom = () => {

    return (
        <>
            <SimpleGameCard
                imageUrl='TestGameImg.jpg'
                title='데-드 스파이스'
            />
        </>
    )
};

export default Custom;