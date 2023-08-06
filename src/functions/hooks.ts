export const useDebounce = <F extends (...args: any) => void>(
    func: F,
    delay = 300
) => {
    let timer: ReturnType<typeof setTimeout>;
    const debouncedFunction = (...args: any[]) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };

    return debouncedFunction;
};
