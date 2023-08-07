export const getIndexes = (source: string, substring: string) => {
    const occurenceIndexes: number[] = [];
    const length = substring.length;
    let index = source.indexOf(substring);
    while (index >= 0 && index + length <= source.length) {
        occurenceIndexes.push(index);
        const sliced = source.slice(index + length);
        const newIndex = sliced.indexOf(substring);
        if (newIndex < 0) {
            break;
        }
        index = newIndex + Math.abs(source.length - sliced.length);
    }
    return occurenceIndexes;
};
