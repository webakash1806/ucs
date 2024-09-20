import { useEffect } from 'react';

/**
 * Custom hook that runs an effect only once, similar to componentDidMount.
 * @param {Function} effect - The effect callback to run.
 */
export const useEffectOnce = (effect) => {
    useEffect(() => {
        effect();
        // Empty dependency array ensures this effect only runs once
    }, []);
};
