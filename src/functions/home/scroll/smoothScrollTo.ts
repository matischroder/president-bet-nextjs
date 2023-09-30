const smoothScrollTo = (
    element: HTMLElement,
    to: number,
    duration: number
): void => {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;

    const animateScroll = (elapsedTime: number): void => {
        elapsedTime += increment;
        const position = easeInOut(elapsedTime, start, change, duration);
        element.scrollTop = position;
        if (elapsedTime < duration) {
            requestAnimationFrame(animateScroll.bind(null, elapsedTime));
        }
    };

    const easeInOut = (t: number, b: number, c: number, d: number): number => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animateScroll.bind(null, 0));
};

export default smoothScrollTo