const {jsWithBabelESM: tsjPreset} = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    roots: ['<rootDir>/src'],
    modulePaths: ['<rootDir>/src'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transform: {
        '^.+\\.(j|t)sx?$': [
            'ts-jest',
            {
                ...tsjPreset.transform,
                isolatedModules: true,
                useESM: true,
            },
        ],
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    restoreMocks: true,
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/src/setupTests.tsx'],
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!react-dnd|core-dnd|@react-dnd|dnd-core|react-dnd-html5-backend)',
    ],
};
