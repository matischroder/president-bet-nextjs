import smoothScrollTo from "./smoothScrollTo";

const scroll = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    if (containerRef.current) {
        const { offsetHeight, scrollHeight, scrollTop } = containerRef.current;

        if (scrollHeight <= scrollTop + offsetHeight + 100) {
            smoothScrollTo(containerRef.current, scrollHeight, 500);
            smoothScrollTo(document.documentElement, scrollHeight, 500);
        }
    }
};

export default scroll;
