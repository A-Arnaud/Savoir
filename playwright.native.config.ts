import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/native-e2e',outputDir:'test-results/native',timeout:90000,expect:{timeout:20000},workers:1,use:{trace:'off',screenshot:'only-on-failure'}});
