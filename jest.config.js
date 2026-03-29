

const config = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: {
					moduleResolution: 'node',
					jsx: 'react-jsx',
				},
			},
		],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
	},
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};

module.exports = config;
