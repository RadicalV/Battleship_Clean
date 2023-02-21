import { jsWithBabel as tsjPreset } from "ts-jest/presets";
import { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>/src"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.(j|t)sx?$": [
      "ts-jest",
      {
        ...tsjPreset.transform,
        isolatedModules: true,
        useESM: true,
      },
    ],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  restoreMocks: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.tsx"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!react-dnd|core-dnd|@react-dnd|dnd-core|react-dnd-html5-backend)",
  ],
};

export default jestConfig;
