import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/remonShow.js",
  output: [
    {
      file: "dist/remonShow.js",
      format: "umd",
      name: "remonShow",
      sourcemap: true,
      intro: "const ENVIRONMENT = 'dev';"
    },
    {
      file: "dist/remonShow.mjs",
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
      contentBase: ["dev", "src"]
    }),
    livereload("dist")
  ]
};
