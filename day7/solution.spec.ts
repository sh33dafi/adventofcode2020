import { fileToArrayNoEmptyLines} from '../lib/read-file';
import {
    countContainBags,
    countValidBags,
    getValidBags,
    matchBagRule,
    parseRule
} from './solution';

const puzInput = fileToArrayNoEmptyLines('./day7/input.txt');
const testInput = [
    'light red bags contain 1 bright white bag, 2 muted yellow bags.',
    'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
    'bright white bags contain 1 shiny gold bag.',
    'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
    'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
    'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
    'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
    'faded blue bags contain no other bags.',
    'dotted black bags contain no other bags.'
];

const testInput2 = [
    'light red bags contain 1 bright white bag, 2 muted yellow bags.',
    'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
    'bright white bags contain 1 shiny gold bag.',
    'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
    'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
    'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
    'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
    'faded blue bags contain no other bags.',
    'dotted black bags contain no other bags.',
    'spotted green bags contain 1 light red bag.'
];


describe('day 7', () => {

    describe('Pasrse rule', () => {
        it('should parse the rules correctly', () => {
            expect(parseRule('light red bags contain 1 bright white bag, 2 muted yellow bags.')).toEqual({
                color: 'light red',
                content: [
                    {
                        amount: 1,
                        color: 'bright white'
                    }, {
                        amount: 2,
                        color: 'muted yellow'
                    }
                ]
            });
            expect(parseRule('dark orange bags contain 3 bright white bags, 4 muted yellow bags.')).toEqual({
                color: 'dark orange',
                content: [
                    {
                        amount: 3,
                        color: 'bright white'
                    }, {
                        amount: 4,
                        color: 'muted yellow'
                    }
                ]
            });
            expect(parseRule('bright white bags contain 1 shiny gold bag.')).toEqual({
                color: 'bright white',
                content: [
                    {
                        amount: 1,
                        color: 'shiny gold'
                    }
                ]
            });
            expect(parseRule('muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.')).toEqual({
                color: 'muted yellow',
                content: [
                    {
                        amount: 2,
                        color: 'shiny gold'
                    }, {
                        amount: 9,
                        color: 'faded blue'
                    }
                ]
            });
            expect(parseRule('shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.')).toEqual({
                color: 'shiny gold',
                content: [
                    {
                        amount: 1,
                        color: 'dark olive'
                    }, {
                        amount: 2,
                        color: 'vibrant plum'
                    }
                ]
            });
            expect(parseRule('dark olive bags contain 3 faded blue bags, 4 dotted black bags.')).toEqual({
                color: 'dark olive',
                content: [
                    {
                        amount: 3,
                        color: 'faded blue'
                    }, {
                        amount: 4,
                        color: 'dotted black'
                    }
                ]
            });
            expect(parseRule('vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.')).toEqual({
                color: 'vibrant plum',
                content: [
                    {
                        amount: 5,
                        color: 'faded blue'
                    }, {
                        amount: 6,
                        color: 'dotted black'
                    }
                ]
            });
            expect(parseRule('faded blue bags contain no other bags.')).toEqual({
                color: 'faded blue',
                content: []
            });
            expect(parseRule('dotted black bags contain no other bags.')).toEqual({
                color: 'dotted black',
                content: []
            });
        });
    });

    describe('matchBagRule', () => {
        it('should return when rule matches a bag', () => {
            const rule = {
                color: 'vibrant plum',
                content: [
                    {
                        amount: 5,
                        color: 'faded blue'
                    }, {
                        amount: 6,
                        color: 'dotted black'
                    }
                ]
            };
            const ruleNoContent = {
                color: 'vibrant plum',
                content: []
            };
            expect(matchBagRule('faded blue', rule)).toBe(true);
            expect(matchBagRule('dotted black', rule)).toBe(true);
            expect(matchBagRule('shiny gold', rule)).toBe(false);
            expect(matchBagRule('faded blue', ruleNoContent)).toBe(false);
        });

        describe('valid bags', () => {
            it('should get a list of valid bags', () => {
                expect(getValidBags(testInput, 'shiny gold')).toEqual([
                    'light red',
                    'dark orange',
                    'bright white',
                    'muted yellow'
                ]);
                expect(getValidBags(testInput2, 'shiny gold')).toEqual([
                    'light red',
                    'dark orange',
                    'bright white',
                    'muted yellow',
                    'spotted green'
                ]);
            });
        });

        describe('count bags', () => {
            it('should count all valid bags', () => {
                expect(countValidBags(testInput, 'shiny gold')).toBe(4);
            });
        });
    });

    describe('puzzle 1', () => {
        it('should return correct value', () => {
            expect(countValidBags(puzInput, 'shiny gold')).toBe(246);
        });
    });

    describe('puzzle 2', () => {
        it('should return correct value', () => {
            expect(countContainBags(puzInput, 'shiny gold')).toBe(2976);
        });
    });
});
