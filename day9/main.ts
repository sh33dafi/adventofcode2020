import { fileToArrayOfNumbers} from '../lib/read-file';
import {encryptionWeakness, findInvalidXMASNumber} from './solution';

console.time('read input');
const input = fileToArrayOfNumbers('./input.txt');
console.timeLog('read input');
console.time('solution 1');
console.timeLog('solution 1', findInvalidXMASNumber(input, 25));

console.time('solution 2');
console.timeLog('solution 2', encryptionWeakness(input, 25));
