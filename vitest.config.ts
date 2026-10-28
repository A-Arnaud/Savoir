import { defineConfig } from 'vitest/config';
export default defineConfig({ test: {
  include: ['tests/**/*.test.{ts,tsx}', 'packages/**/*.test.{ts,tsx}', 'apps/**/*.test.{ts,tsx}'],
  environmentOptions: { jsdom: { url: 'https://www.youtube.com/' } },
} });
