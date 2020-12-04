import {findSum, findSum3, getProduct, getSolution1, getSolution2} from './solution';
import {fileToArrayOfNumbers} from '../lib/read-file';

const exinput = fileToArrayOfNumbers('./day1/input.txt');
const input = [
    1721
    , 979
    , 366
    , 299
    , 675
    , 1456
];

describe('day 1', () => {
    it('should find 2 values summing to 2020', () => {
        expect(findSum([40, 20, 2000], 2020)).toEqual([20, 2000]);
        expect(findSum(input, 2020)).toEqual([1721, 299]);
        expect(findSum(input, 1041)).toEqual([366, 675]);
        expect(findSum(exinput, 1334)).toEqual([71, 1263]);
    });

    it('should get the correct product', () => {
        expect(getProduct([1721, 299])).toEqual(514579);
        expect(getProduct([366, 979, 675])).toEqual(241861950);
    });

    it('should find 3 values summing to 2020', () => {
        expect(findSum3([10, 40, 10, 2000], 2020)).toEqual([10, 10, 2000]);
        expect(findSum3(input, 2020)).toEqual([979, 366, 675]);
    });

});

describe('Solution 1', () => {
    it('should get correct product for 2 values summing 2020', () => {
        expect(getSolution1(input)).toEqual(514579);
        expect(getSolution1(exinput)).toEqual(793524);
    });
});

describe('Solution 2', () => {
    it('should get correct product for 2 values summing 2020', () => {
        expect(getSolution2(input)).toEqual(241861950);
        expect(getSolution2(exinput)).toEqual(61515678);
    });
});
