const fs = require('fs');

export const fileToArrayOfNumbers = (path: string) => {
    const data = fs.readFileSync(path, 'utf8');
    return data.split('\n').map(v => parseInt(v, 10));
};
