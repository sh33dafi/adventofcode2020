export const getRow = (input: Array<string>): number => {
    return input.reduce(determineRange, [0, 127])[0];

};

export const determineRange = (acc, rowIndication) => {
    const [si, ei] = acc;
    const half = Math.ceil((ei - si) / 2);
    if (rowIndication === 'L' || rowIndication === 'F') {
        return [si, ei - half];
    } else {
        return [si + half, ei];
    }
};

export const getColumn = (input: Array<string>): number => {
    return input.reduce(determineRange, [0, 7])[0];
};

export const getSeatId = (row: number, column: number): number => {
    return row * 8 + column;
};

export const calculateSeatInfo = (input: Array<string>): Array<number> => {
    const row = getRow(input.slice(0, 7));
    const column = getColumn(input.slice(Math.max(input.length - 3, 1)));
    const seatId = getSeatId(row, column);
    return [row, column, seatId];
};

export const getHighestSeatId = (input: Array<string>): number => {
    return input
        .map(inp => calculateSeatInfo(inp.split('')))
        .map(info => info[2])
        .sort((a,b)=> b- a)[0]
};

export const findMissingSeats = (input: Array<string>): number => {
    const calcSeats = input
        .map(inp => calculateSeatInfo(inp.split('')))
        .map(info => info[2])
        .sort((a, b) =>a-b)
    ;

    for(let i =0; i < calcSeats.length - 1; i++) {
        if (!((calcSeats[i] + 1) === calcSeats[i+1])) {
            return calcSeats[i] + 1;
        }
    }
    return 0;
}
