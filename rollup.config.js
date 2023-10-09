import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve'
import externalPeers from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';
import pkg from './package.json' assert {type: 'json'}


const prod = !process.env.ROLLUP_WATCH;
/**@type {import("rollup").RollupOptions} */
export default [
    {
        input: "src/index.ts",
        external: Object.keys(pkg.dependencies),
        output: [
            {
                file: pkg.main,
                format: "cjs",
                sourcemap: true
            },
            {
                file: pkg.module,
                format: "es",
                sourcemap: true
            }
        ],
        plugins: [
            json(),
            typescript({
                tsconfig: "./tsconfig.json"
            }),
            postcss({
                extract: true,
                extensions: [/\.(scss|sass)$/],
                minimize: true,
            }),
            prod && terser()
        ]
    }, {
        input: "dist/es/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: 'es' }],
        plugins: [dts()],
        external: [/\.(scss|sass)$/]
    }
]