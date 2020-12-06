import {fileToArray} from '../lib/read-file';
import {findMissingSeats, getHighestSeatId} from './solution';

console.time('read input');
const input = fileToArray('./input.txt');
console.timeLog('read input');
console.time('solution 1');
console.timeLog('solution 1',getHighestSeatId(input));

console.time('solution 2');
console.timeLog('solution 2',findMissingSeats(input));
