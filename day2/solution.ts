const normalizeInput = (input: string): Array<any> => {
    const normalizeChar = (char: string): string => {
        return char.replace(':', '');
    };

    const normalizeNumbers = (occurrence: string): Array<number> => {
        return occurrence.split('-').map(v => parseInt(v, 10));
    };

    const [occurrence, char, password] = input.split(' ');
    return [...normalizeNumbers(occurrence), normalizeChar(char), password];
}

export const validatePassWordOccurrence = (passWithPolicy: string): boolean => {
    const [min, max, char, password] = normalizeInput(passWithPolicy);
    const charCount = countChar(password, char);
    return min <= charCount && charCount <= max;
};

export const validatePassWordPosition = (passWithPolicy: string): boolean => {
    const [pos1, pos2, char, password] = normalizeInput(passWithPolicy);
    const charMatchAtPos1 = password[pos1 - 1] === char;
    const charMatchAtPos2 = password[pos2 - 1] === char;
    return ( charMatchAtPos1 || charMatchAtPos2 ) && !( charMatchAtPos1 && charMatchAtPos2 );
};

const countChar = (value: string, char: string): number => {
    return value.split('').filter(v => v === char).length;
};

export const countValidPasswords = (input: Array<string>, policy: Function): number => {
    return input.filter(password => policy(password)).length;
};
