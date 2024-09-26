import { useEffect } from 'react';

export const useEffectOnce = (effect) => {
    useEffect(() => {
        effect();
        // Empty dependency array ensures this effect only runs once
    }, []);
};
