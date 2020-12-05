import {fileToArrayNoEmptyLines} from '../lib/read-file';
import {
    calculateSeatInfo,
    determineRange,
    findMissingSeats,
    getColumn,
    getHighestSeatId,
    getRow,
    getSeatId
} from './solution';

const puzInput = fileToArrayNoEmptyLines('./day5/input.txt');

describe('day 5', () => {

    describe('getRow', () => {
        it('should return the correct row', () => {
            expect(getRow(['F','B', 'F', 'B', 'B', 'F', 'F'])).toEqual(44)
        });
    });

    describe('determineRange for RL', () => {
        it('should return the correct column range', () => {
            expect(['R'].reduce(determineRange, [0, 7])).toEqual([4,7])
            expect(['R','L'].reduce(determineRange, [0, 7])).toEqual([4,5])
            expect(['R','L', 'R'].reduce(determineRange, [0, 7])).toEqual([5,5])
        });
    });

    describe('getColumn', () => {
        it('should return the correct column', () => {
            expect(getColumn(['R','L','R'])).toEqual(5)
        });
    });

    describe('Calculate seat info', () => {
        it('should calculate the correct seatInfo', () => {
            expect(calculateSeatInfo('FBFBBFFRLR'.split(''))).toEqual([44, 5, 357]);
            expect(calculateSeatInfo('BFFFBBFRRR'.split(''))).toEqual([70, 7, 567]);
            expect(calculateSeatInfo('FFFBBBFRRR'.split(''))).toEqual([14, 7, 119]);
            expect(calculateSeatInfo('BBFFBBFRLL'.split(''))).toEqual([102, 4, 820]);
        });
    });

    describe('getSeat', () => {
        it('should return the correct seat', () => {
            expect(getSeatId(44, 5)).toEqual(357)
        });
    });

    describe('get highest seat', () => {
        it('should return the highest seat', () => {
            const codes = [
                'FBFBBFFRLR',
                'BFFFBBFRRR',
                'FFFBBBFRRR',
                'BBFFBBFRLL'
            ];
            expect(getHighestSeatId(codes)).toEqual(820);
        });
    });

    describe('puzzle 1', () => {
        it('should return correct value', () => {
            expect(getHighestSeatId(puzInput)).toEqual(938);
        });
    });

    describe('puzzle 2', () => {
        it('should return correct value', () => {
            expect(findMissingSeats(puzInput)).toEqual(696);
        });
    });
});
