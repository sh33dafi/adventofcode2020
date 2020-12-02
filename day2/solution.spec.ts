import {countValidPasswords, validatePassWordOccurrence, validatePassWordPosition} from './solution';
import {fileToArray} from '../lib/read-file';

const puzzleInput = fileToArray('./day2/input.txt');
const testInput = [
    '1-3 a: abcde',
    '1-3 b: cdefg',
    '2-9 c: ccccccccc'
];
describe('day2', () => {

    it('should correctly validate a password', () => {
        expect(validatePassWordOccurrence('1-3 b: cdefg')).toBe(false);
        expect(validatePassWordOccurrence('1-3 a: abcde')).toBe(true);
        expect(validatePassWordOccurrence('1-3 a: asddsda')).toBe(true);
        expect(validatePassWordOccurrence('1-3 a: asdasda')).toBe(true);
        expect(validatePassWordOccurrence('1-3 a: asdaasda')).toBe(false);
        expect(validatePassWordOccurrence('2-9 c: ccccccccc')).toBe(true);
    });

    describe('When the position policy applies', () => {
        it('should correctly validate a password', () => {
            expect(validatePassWordPosition('1-3 b: cdefg')).toBe(false);
            expect(validatePassWordPosition('1-3 a: abcde')).toBe(true);
            expect(validatePassWordPosition('2-9 c: ccccccccc')).toBe(false);
        });
    });


    it('should count all valid passwords', () => {
        expect(countValidPasswords(testInput, validatePassWordOccurrence)).toEqual(2);
    });

    describe('puzzle 1', () => {
        it('should give the correct result', () => {
            expect(countValidPasswords(puzzleInput, validatePassWordOccurrence)).toEqual(645);
        });
    });

    describe('puzzle 2', () => {
        it('should give the correct result', () => {
            expect(countValidPasswords(puzzleInput, validatePassWordPosition)).toEqual(737);
        });
    });
});
