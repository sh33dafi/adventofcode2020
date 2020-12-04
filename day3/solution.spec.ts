import {fileToArrayNoEmptyLines} from '../lib/read-file';
import {countTreesForSlopes, countTreesOnPath, hasTree, travel} from './solution';

const puzzleInput = fileToArrayNoEmptyLines('./day3/input.txt');
const puzzleInput2 = fileToArrayNoEmptyLines('./day3/input2.txt');
const testInput = [
    '..##.......',
    '#...#...#..',
    '.#....#..#.',
    '..#.#...#.#',
    '.#...##..#.',
    '..#.##.....',
    '.#.#.#....#',
    '.#........#',
    '#.##...#...',
    '#...##....#',
    '.#..#...#.#'];

describe('day3', () => {

    const defaultSlope = {right: 3, down: 1};
    it('travel should work', () => {
        let cor = {x:0,y:0};
        const width = 11;
        cor = travel(cor, width, defaultSlope);
        expect(cor).toEqual({x: 3, y: 1});
        cor = travel(cor, width, defaultSlope);
        expect(cor).toEqual({x: 6, y: 2});
        cor = travel(cor, width, defaultSlope);
        expect(cor).toEqual({x: 9, y: 3});
        cor = travel(cor, width, defaultSlope);
        expect(cor).toEqual({x: 1, y: 4});
    });

    it('should check for trees', () => {
        expect(hasTree({x:0,y:0}, '..##.......'.split(''))).toBe(false);
        expect(hasTree({x:6,y:2}, '.#....#..#.'.split(''))).toBe(true);
    });


    it('should count the trees on the path', () => {
        expect(countTreesOnPath(testInput, {right: 1, down: 1})).toBe(2);
        expect(countTreesOnPath(testInput, defaultSlope)).toBe(7);
        expect(countTreesOnPath(testInput, {right: 5, down: 1})).toBe(3);
        expect(countTreesOnPath(testInput, {right: 7, down: 1})).toBe(4);
        expect(countTreesOnPath(testInput, {right: 1, down: 2})).toBe(2);
        expect(countTreesOnPath(puzzleInput2, defaultSlope)).toBe(250);
        expect(countTreesOnPath(puzzleInput, defaultSlope)).toBe(247);
    });

    it('should give a result for all slopes', () => {
        expect(countTreesForSlopes(testInput)).toEqual(336);
        expect(countTreesForSlopes(puzzleInput2)).toEqual(1592662500);
        expect(countTreesForSlopes(puzzleInput)).toEqual(2983070376);
    });
});
