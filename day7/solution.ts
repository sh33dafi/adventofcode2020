export const parseRule = (rule: string): Rule => {
    const contentMatches = rule.match(/\d(\s\S*){2}?/gi);
    let content = [];
    if (contentMatches) {
        content = contentMatches.map(pareseContent);
    }
    const color = rule.match(/^\S*\s\S*/)[0];
    return {color, content};
};

export const pareseContent = (content: string): Content => {
    const [amountAsString, ...colors] = content.split(' ');
    return {
        amount: parseInt(amountAsString, 10),
        color: colors.join(' ')
    };
};

export const matchBagRule = (color: string, rule: Rule): boolean => {
    return rule.content.some(content => content.color === color);
};

export const getValidBags = (input: Array<string>, bagToSearch: string): Array<string> => {
    const rules = input.map(parseRule);
    const matchingBags = new Set<string>();

    const findBags = (childColor: string, parentColor: string) => {
        const children = rules.find(rule => rule.color === childColor).content.map(content => content.color);
        if (children.includes(bagToSearch)) {
            matchingBags.add(parentColor);
            return;
        }
        if (children.length === 0) return;

        for (let i = 0; i < children.length; i++) {
            findBags(children[i], parentColor);
        }

    }

    for (let i = 0; i < rules.length; i++) {
        findBags(rules[i].color, rules[i].color);
    }

    return Array.from(matchingBags);

};

export const getBagsContainedBy =(input: Array<string>, bag: string): number => {
    const rules = input.map(parseRule);
    let matchingBags = 0;

    function findPaths(child, count) {
        const childRule = rules.find(rule => rule.color === child);
        const children = childRule.content;

        if (children.length === 0) return;

        for (let i = 0; i < children.length; i++) {
            const currentBagTotal = childRule.content.find(content => content.color === children[i].color).amount;
            const childrenToAdd = count * currentBagTotal;

            matchingBags += childrenToAdd;
            findPaths(children[i].color, childrenToAdd);
        }
    }

    findPaths(bag, 1);

    return matchingBags;
}

export const countValidBags = (input: Array<string>, bag: string): number => {
    return getValidBags(input, bag).length;
}

export const countContainBags = (input: Array<string>, bag: string): number => {
    return getBagsContainedBy(input, bag);
}

export interface Rule {
    color: string;
    content: Array<Content>;
}

export interface Content {
    amount: number,
    color: string
}
