import {fileToArray} from '../lib/read-file';
import {
    buildPassportStrings,
    convertToObject,
    countValidPassports,
    strictValidatePassport,
    validateKey,
    validatePassport
} from './solution';

const puzInput = fileToArray('./day4/input.txt');
const testInput = [
        'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
        'byr:1937 iyr:2017 cid:147 hgt:183cm',
        '',
        'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
        'hcl:#cfa07d byr:1929',
        '',
        'hcl:#ae17e1 iyr:2013',
        'eyr:2024',
        'ecl:brn pid:760753108 byr:1931',
        'hgt:179cm',
        '',
        'hcl:#cfa07d eyr:2025 pid:166559648',
        'iyr:2011 ecl:brn hgt:59in'
    ]
;

describe('day 4', () => {
    it('should convert to object', () => {
        expect(convertToObject('ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm')).toEqual({
            ecl: 'gry',
            pid: '860033327',
            eyr: '2020',
            hcl: '#fffffd',
            byr: '1937',
            iyr: '2017',
            cid: '147',
            hgt: '183cm'
        });

    });

    it('should parse the passport fields', () => {
        expect(validatePassport(convertToObject('ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm'))).toBe(true);
        expect(validatePassport(convertToObject('iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929'))).toBe(false);
        expect(validatePassport(convertToObject('hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm'))).toBe(true);
        expect(validatePassport(convertToObject('hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in'))).toBe(false);
    });

    it('should build a passport string', () => {
        expect(buildPassportStrings(testInput)).toStrictEqual([
            'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm',
            'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929',
            'hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm',
            'hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in'
        ]);
    });

    it('should count the correct number of passwords', () => {
        expect(countValidPassports(testInput, validatePassport)).toEqual(2);
    });

    it('should count the correct number of passwords', () => {
        expect(countValidPassports(testInput, strictValidatePassport)).toEqual(2);
    });

    it('should validate correctly', () => {
        expect(validateKey('byr', '2002')).toBe(true);
        expect(validateKey('byr', '2003')).toBe(false);
        expect(validateKey('hgt', '60in')).toBe(true);
        expect(validateKey('hgt', '190cm')).toBe(true);
        expect(validateKey('hgt', '190in')).toBe(false);
        expect(validateKey('hgt', '190')).toBe(false);
        expect(validateKey('hcl', '#123abc')).toBe(true);
        expect(validateKey('hcl', '#123abz')).toBe(false);
        expect(validateKey('hcl', '123abc')).toBe(false);
        expect(validateKey('ecl', 'brn')).toBe(true);
        expect(validateKey('ecl', 'wat')).toBe(false);
        expect(validateKey('pid', '000000001')).toBe(true);
        expect(validateKey('pid', '0123456789')).toBe(false);
    });

    it('should validate a passport strict', () => {
        expect(strictValidatePassport(convertToObject('eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926'))).toBe(false);
        expect(strictValidatePassport(convertToObject('iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:1946'))).toBe(false);
        expect(strictValidatePassport(convertToObject('hcl:dab227 iyr:2012 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277'))).toBe(false);
        expect(strictValidatePassport(convertToObject('hgt:59cm ecl:zzz eyr:2038 hcl:74454a iyr:2023 pid:3556412378 byr:2007'))).toBe(false);

        expect(strictValidatePassport(convertToObject('pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f'))).toBe(true);
        expect(strictValidatePassport(convertToObject('eyr:2029 ecl:blu cid:129 byr:1989 iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm'))).toBe(true);
        expect(strictValidatePassport(convertToObject('hcl:#888785 hgt:164cm byr:2001 iyr:2015 cid:88 pid:545766238 ecl:hzl eyr:2022'))).toBe(true);
        expect(strictValidatePassport(convertToObject('iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719'))).toBe(true);

    });

    describe('puzzle 1', () => {
        it('should return correct value', () => {
            expect(countValidPassports(puzInput, validatePassport)).toEqual(196);
        });
    });

    describe('puzzle 2', () => {
        it('should return correct value', () => {
            expect(countValidPassports(puzInput, strictValidatePassport)).toEqual(114);
        });
    });
});
