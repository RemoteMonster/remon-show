import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import cssimport from 'postcss-import';
import autoprefixer from 'autoprefixer';

export default [
  {
    input: "src/RemonShow.js",
    output: {
      format: "umd",
      file: "dist/remonshow-mini.min.js",
      name: "RemonShow"
    },
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs({ include: "node_modules/**" }),
      terser(),
      postcss({
        plugins: [cssimport(), autoprefixer()]
      }),
    ]
  },
  
];
