export const findSum = (input: Array<number>, sum: number): Array<number> => {
    const rest = input.map(v => sum - v)
        .filter(v => v <= sum)
        .filter(v => v >= 0);
    for (let i = 0; i < rest.length; i ++) {
        const rIndex = input.findIndex(value => value == rest[i]);
        if (rIndex >=0) {
            return [sum - input[rIndex], input[rIndex]];
        }
    }
    return null;
};

export const findSum3 = (input: Array<number>, sum: number): Array<number> => {
    const rest = input.map(v => sum - v).filter(v => v >= 0);
    for (let i = 0; i < rest.length; i ++) {
        const s = findSum(input, rest[i]);
        if (s) {
            const t = sum - rest[i];
            return [t, ...s];
        }
    }
    return null;
};

export const getProduct = (input: Array<number>): number => {
    return input.reduce((previousValue, currentValue) => currentValue * previousValue, 1);
};

export const getSolution1 = (input: Array<number>): number => {
    return getProduct(findSum(input, 2020));
};

export const getSolution2 = (input: Array<number>): number => {
    return getProduct(findSum3(input, 2020));
};


