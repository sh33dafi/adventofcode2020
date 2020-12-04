const hexMatcher = /^#[a-f|0-9]{6}$/;
const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
const digitMatcher = /^\d{9}$/;
const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

export const convertToObject = (passport: string): {} => {
    return passport.split(' ').reduce((acc, d) => {
        const [key, value] = d.split(':');
        acc[key] = value;
        return acc;
    }, {});
};

const validationRules = {
    'byr': (inp) => {
        const year = parseInt(inp, 10);
        return inp.length === 4 && 1920 <= year && year <= 2002;
    },
    'iyr': (inp) => {
        const year = parseInt(inp, 10);
        return inp.length === 4 && 2010 <= year && year <= 2020;
    },
    'eyr': (inp) => {
        const year = parseInt(inp, 10);
        return inp.length === 4 && 2020 <= year && year <= 2030;
    },
    'hgt': (inp: string) => {
        const lengthMatcher = /^\d+(in|cm)$/;
        const unitMatcher = /(in|cm)/;
        if (inp.match(lengthMatcher)) {
            const v = parseInt(inp.replace(unitMatcher, ''), 10);
            if (inp.endsWith('in')) {
                return 59 <= v && v <= 76;
            } else {
                return 150 <= v && v <= 193;
            }
        }
        return false;
    }, 'hcl': (inp: string) => !!inp.match(hexMatcher)
    , 'ecl': (inp: string) => colors.indexOf(inp) >= 0
    , 'pid': (inp: string) => !!inp.match(digitMatcher)
};

export const validateKey = (key: string, input: string): boolean => {
    return validationRules[key](input);
};

export const validatePassport = (data: {}): boolean => {
    const keys = Object.keys(data).sort();

    return fields.every(k => keys.indexOf(k) >= 0);
};

export const strictValidatePassport = (data: {}): boolean => {
    if (!validatePassport(data)) {
        return false;
    }

    const keys = Object.keys(data).filter(key => key !== 'cid').sort();

    return keys.every(key => validateKey(key, data[key]));
};

export const buildPassportStrings = (input: Array<string>): Array<string> => {
    return input.map(inp => {
        if (inp === '') {
            return ',';
        }
        return ` ${inp}`;
    }).join('').split(',').map(v => v.trim());
};

export const countValidPassports = (input: Array<string>, validation: Function): number => {
    const sum = (acc, valid) => {
        if (valid) {
            return acc + 1;
        }
        return acc;
    };
    return buildPassportStrings(input)
        .map(passport => validation(convertToObject(passport)))
        .reduce(sum, 0);
};


