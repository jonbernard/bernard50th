import '@testing-library/jest-dom';

// Mantine uses matchMedia; jsdom doesn't provide it (guard for node environment)
if (typeof window !== 'undefined') Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});
