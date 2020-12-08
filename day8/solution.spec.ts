import { fileToArrayNoEmptyLines} from '../lib/read-file';
import {fixProgram, getAccValueForProgram, parseInstruction, runProgram} from './solution';

const puzInput = fileToArrayNoEmptyLines('./day8/input.txt');
const testInput = [
    'nop +0',
    'acc +1',
    'jmp +4',
    'acc +3',
    'jmp -3',
    'acc -99',
    'acc +1',
    'jmp -4',
    'acc +6'
];

const correctProgram = [
    'nop +0',
    'acc +1',
    'jmp +4',
    'acc +3',
    'jmp -3',
    'acc -9',
    'acc +1',
    'nop -4',
    'acc +6'
]


describe('day 8', () => {

    describe('Parse instruction', () => {
        it('should parse the instruction', () => {
            expect(parseInstruction(testInput[0])).toEqual({operator: 'nop', argument: 0});
            expect(parseInstruction(testInput[1])).toEqual({operator: 'acc', argument: 1});
            expect(parseInstruction(testInput[2])).toEqual({operator: 'jmp', argument: 4});
            expect(parseInstruction(testInput[3])).toEqual({operator: 'acc', argument: 3});
            expect(parseInstruction(testInput[4])).toEqual({operator: 'jmp', argument: -3});
            expect(parseInstruction(testInput[5])).toEqual({operator: 'acc', argument: -99});
            expect(parseInstruction(testInput[6])).toEqual({operator: 'acc', argument: 1});
            expect(parseInstruction(testInput[7])).toEqual({operator: 'jmp', argument: -4});
            expect(parseInstruction(testInput[8])).toEqual({operator: 'acc', argument: 6});
        });
    });

    describe('run program', () => {
        it('should run the program and stop when the same instruction is executed', () => {
            expect(runProgram(testInput.map(parseInstruction))).toEqual({exitCode: -8, arg: 5});
            expect(runProgram(correctProgram.map(parseInstruction))).toEqual({exitCode: 0, arg: 8});
        });
    });

    describe('fix progam', () => {
        it('should fix te program', () => {
            expect(fixProgram(testInput)).toEqual(8);
        });
    });

    describe('puzzle 1', () => {
        it('should return correct value', () => {
            expect(getAccValueForProgram(puzInput)).toEqual(1675);
        });
    });

    describe('puzzle 2', () => {
        it('should return correct value', () => {
            expect(fixProgram(puzInput)).toEqual(1532)
        });
    });
});
