import {fileToArrayOfNumbers} from '../lib/read-file';
import {encryptionWeakness, findContiguousSet, findInvalidXMASNumber} from './solution';

const puzInput = fileToArrayOfNumbers('./day9/input.txt');
const testInput = [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576
]


describe('day 9', () => {

    describe('Find XMAS miss', () => {
        it('should return the invalid number', () => {
            expect(findInvalidXMASNumber(testInput, 5)).toEqual(127);
        });
    });

    describe('find a contiguous set', () => {
        it('should return the contiguous', () => {
            expect(findContiguousSet(testInput, 5)).toEqual([15,25,47,40])
        });
    });

    describe('find encryption weakness', () => {
        it('should return the weakness', () => {
            expect(encryptionWeakness(testInput, 5)).toEqual(62);
        });
    });

    describe('puzzle 1', () => {
        it('should return correct value', () => {
            expect(findInvalidXMASNumber(puzInput, 25)).toEqual(375054920);
        });
    });

    describe('puzzle 2', () => {
        it('should return correct value', () => {
            expect(encryptionWeakness(puzInput, 25)).toEqual(54142584);
        });
    });
});
