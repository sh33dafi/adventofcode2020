import {fileToArray} from '../lib/read-file';
import {
    getGroups,
    getUniqueAnswers,
    countUniqueAnswers,
    countAllYesAnswers,
    countEveryYesAnswersInGroup, countEveryYes
} from './solution';

const puzInput = fileToArray('./day6/input.txt');
const testInput = [
    'abc',
    '',
    'a',
    'b',
    'c',
    '',
    'ab',
    'ac',
    '',
    'a',
    'a',
    'a',
    'a',
    '',
    'b'
];


describe('day 6', () => {

    describe('create groups', () => {
        it('should create groups form the input', () => {
            expect(getGroups(testInput)).toEqual([
                [
                    "abc"
                ],
                [
                    "a",
                    "b",
                    "c"
                ],
                [
                    "ab",
                    "ac"
                ],
                [
                    "a",
                    "a",
                    "a",
                    "a"
                ],
                [
                    "b"
                ]
            ]);
        });
    });

    describe('get unique answers', () => {
        it('should return unique answers', () => {
            expect(getUniqueAnswers('abc')).toEqual(['a','b','c']);
            expect(getUniqueAnswers('abac')).toEqual(['a','b','c']);
            expect(getUniqueAnswers('aaaa')).toEqual(['a']);
            expect(getUniqueAnswers('b')).toEqual(['b']);
        });
    });

    describe('get unique answers count', () => {
        it('should return unique answers count', () => {
            expect(countUniqueAnswers('abc')).toEqual(3);
            expect(countUniqueAnswers('abac')).toEqual(3);
            expect(countUniqueAnswers('aaaa')).toEqual(1);
            expect(countUniqueAnswers('b')).toEqual(1);
        });
    });

    describe('count every yes', () => {
        it('should return the correct count', () => {
            expect(countEveryYes({ a: 0, b: 0, c: 0 })).toEqual(3);
            expect(countEveryYes({ a: 2, b: 2, c: 2 })).toEqual(0);
            expect(countEveryYes( { a: 0, b: 1, c: 1 })).toEqual(1);
            expect(countEveryYes( { a: 0 })).toEqual(1);
            expect(countEveryYes( { b: 0 })).toEqual(1);
        });
    });

    describe('count all yes answers', () => {
        it('should return the correct count', () => {
            expect(countAllYesAnswers(testInput)).toEqual(11);
        });
    });

    describe('countEveryYesAnswersInGroup', () => {
        it('should return the correct count', () => {
            expect(countEveryYesAnswersInGroup(testInput)).toEqual(6);
        });
    });

    describe('puzzle 1', () => {
        it('should return correct value', () => {
            expect(countAllYesAnswers(puzInput)).toEqual(6742);
        });
    });

    describe('puzzle 2', () => {
        it('should return correct value', () => {
            expect(countEveryYesAnswersInGroup(puzInput)).toEqual(3447);
        });
    });
});
