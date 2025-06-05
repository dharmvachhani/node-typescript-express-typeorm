import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['cjs'], // Or ['cjs'] if you're using CommonJS
    target: 'es2022',
    splitting: false, // <- single file
    sourcemap: true,
    clean: true,
    shims: false,
    dts: false, // set true if you want .d.ts files
});
