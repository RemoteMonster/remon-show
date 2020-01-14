import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";


export default [
  {
    input: "src/RemonShow.js",
    output: {
      format: "umd",
      file: "dist/RemonShow.min.js",
      name: "RemonShow"
    },
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs({ include: "node_modules/**" }),
      terser()
    ]
  },
  
];
