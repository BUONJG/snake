export const pellets = new Map([
    ['apple', { category: 'fruits', lengthIncrement: 2 }],
    ['banana', { category: 'fruits', lengthIncrement: 2 }],
    ['pear', { category: 'fruits', lengthIncrement: 2 }],
    ['watermelon', { category: 'fruits', lengthIncrement: 2 }],

    ['burger', { category: 'junk-food', lengthIncrement: 6 }],
    ['cookie', { category: 'junk-food', lengthIncrement: 3 }],
    ['cupcake', { category: 'junk-food', lengthIncrement: 3 }],
    ['fries', { category: 'junk-food', lengthIncrement: 4 }],
    ['pizza', { category: 'junk-food', lengthIncrement: 5 }],

    ['avocado', { category: 'vegetables', lengthIncrement: -2 }],
    ['brocoli', { category: 'vegetables', lengthIncrement: -2 }],
    ['carrot', { category: 'vegetables', lengthIncrement: -2 }],
    ['corn', { category: 'vegetables', lengthIncrement: -2 }],
    ['cucumber', { category: 'vegetables', lengthIncrement: -2 }],
    ['eggplant', { category: 'vegetables', lengthIncrement: -2 }],
    ['radish', { category: 'vegetables', lengthIncrement: -2 }],
]);

export const pelletNames = Array.from(pellets.keys());