import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import cssimport from 'postcss-import';
import autoprefixer from 'autoprefixer';

export default {
  input: "src/RemonShow.js",
  output: [
    {
      file: "dist/RemonShow-mini.js",
      format: "umd",
      name: "RemonShow",
      sourcemap: true,
      intro: "const ENVIRONMENT = 'dev';"
    },
    {
      file: "dist/RemonShow.mjs",
      format: "es",
      sourcemap: true,
      intro: "const ENVIRONMENT = 'dev';"
    }
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({ include: "node_modules/**" }),
    serve({
      /*http test (host is your local ip)*/
      //host : '172.30.1.44',
      contentBase: ["dist", "dev"]
    }),
    livereload("dist"),
    postcss({
      plugins: [cssimport(), autoprefixer()]
    })
    
  ]
};
