import {fileToArray} from '../lib/read-file';
import {countAllYesAnswers, countEveryYesAnswersInGroup} from './solution';

console.time('read input');
const input = fileToArray('./input.txt');
console.timeLog('read input');
console.time('solution 1');
console.timeLog('solution 1',countAllYesAnswers(input));

console.time('solution 2');
console.timeLog('solution 2',countEveryYesAnswersInGroup(input));
