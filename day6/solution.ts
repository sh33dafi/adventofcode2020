export const getGroups = (input: Array<string>): Array<Array<string>> => {
    const out = [];
    let tmp = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            out.push(tmp);
            tmp = [];
        } else {
            tmp.push(input[i]);
        }
    }
    if (tmp.length > 0) {
        out.push(tmp);
    }
    return out;
};

export const getUniqueAnswers = (input: string): Array<string> => {
    return input.split('').reduce((acc, val) => {
        if (!acc.includes(val)) {
            return [...acc, val];
        }
        return acc;
    }, []);
};

export const countUniqueAnswers = (input: string): number => {
    return getUniqueAnswers(input).length;
};

export const countAllYesAnswers = (input: Array<string>): number => {
    const groups = getGroups(input);
    return groups.map(groups => groups.join('')).map(countUniqueAnswers).reduce((acc, val) => acc + val, 0);
};

export const countEveryYes = (counts: {}): number => {
    return Object.entries(counts)
        .map(([_, value]) => value)
        .filter(value => value === 0)
        .length;
};

export const countEveryYesAnswersInGroup = (input: Array<string>): number => {
    const groups = getGroups(input);
    return groups.map(group => {
        const grouplength = group.length;
        return group
            .join('')
            .split('')
            .reduce((acc, val) => {
                if (acc[val] === undefined) {
                    acc[val] = grouplength - 1;
                } else {
                    acc[val] = acc[val] - 1;
                }
                return acc;
            }, {});
    })
        .map(countEveryYes)
        .reduce((acc, value) => acc + value, 0);
};
