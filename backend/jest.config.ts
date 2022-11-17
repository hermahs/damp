import type {Config} from "@jest/types"

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    modulePathIgnorePatterns: [
        "data"
    ],
    collectCoverage: true,
    coverageReporters: ["html", "text", "text-summary", "cobertura"],
    coverageDirectory: "./coverage/" 
}

export default config; 