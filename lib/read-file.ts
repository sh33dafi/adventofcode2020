const fs = require('fs');

export const fileToArrayOfNumbers = (path: string) => {
    return fileToArray(path).map(v => parseInt(v, 10));
};

export const fileToArray = (path: string) => {
    const data = fs.readFileSync(path, 'utf8').trim();
    return data.split('\n').filter(v => !!v);
};
