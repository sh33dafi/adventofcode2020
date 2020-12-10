export const findInvalidXMASNumber = (numbers: Array<number>, preamble:number): number=> {
    for (let i = 0; i < numbers.length; i++) {
        const end = preamble + i;
        const range = numbers.slice(i, end + 1);
        const newRange = numbers.slice(i, end);
        const finalSum = range.pop();

        for (let j = 0; j < newRange.length; j++) {
            if (j === range.length - 1) {
                return finalSum;
            } else if (newRange.includes(finalSum - range[j])) {
                break;
            }
        }
    }
}

export const findContiguousSet = (numbers: Array<number>, preamble:number): Array<number> => {
    const invalidXMASNumber = findInvalidXMASNumber(numbers, preamble);

    for (let i = 0; i < numbers.length; i++) {
        const contiguousSet = [numbers[i]];
        for (let j = i + 1; j < numbers.length; j++) {
            contiguousSet.push(numbers[j]);
            const sum = contiguousSet.reduce((acc,v) => acc +v, 0);
            if (sum > invalidXMASNumber) {
                break;
            }
            if (sum === invalidXMASNumber ) {
                return contiguousSet;
            }
        }

    }
}

export const encryptionWeakness = (numbers: Array<number>, preamble:number): number => {
    const [min, ...rest] = findContiguousSet(numbers, preamble).sort((a,b) => a-b);
    const [max] = rest.slice(-1)
    return min + max;

}
