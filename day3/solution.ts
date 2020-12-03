export const travel = (cor: Cor, width: number, slope: Slope): Cor => {
    let x = cor.x + slope.right;
    const y = cor.y + slope.down;
    if (x >= width) {
        x = x - width;
    }
    return {x, y};
};

export const hasTree = (cor: Cor, line: Array<string>): boolean => {
    return line[cor.x] === '#';
};

export const countTreesOnPath = (input: Array<string>, slope: Slope): number => {
    let cor = {x: 0, y: 0};
    let treeCount = 0;
    let line = input[cor.y].split('');
    const initialWidth = line.length;

    for (let i = 0; i < input.length; i++) {
        cor = travel(cor, initialWidth, slope);
        if (input[cor.y] === undefined) break;
        line = input[cor.y].split('');
        if (hasTree(cor, line)) {
            treeCount++;
        }
    }
    return treeCount;

};

export const countTreesForSlopes = (input: Array<string>): number => {
    const slopes = [{right: 1, down: 1},
    {right: 3, down: 1},
    {right: 5, down: 1},
    {right: 7, down: 1},
    {right: 1, down: 2}]
    return slopes.map(slope => countTreesOnPath(input, slope)).reduce((acc, value) => value * acc, 1);
}

interface Cor {
    x: number;
    y: number;
}

interface Slope {
    right: number;
    down: number;
}
