# postcss-colorguard-formatter

A neat formatter for the [postcss-colorguard](https://github.com/SlexAxton/css-colorguard) plugin.

## Installation

```
npm install postcss-colorguard-formatter
typings install
```

## Usage

```js
import postcss from "postcss";
import colorguard from "colorguard";
import reporter from "postcss-reporter";
import formatter from "postcss-colorguard-formatter";

const instance = postcss([
  colorguard(),
  reporter({ formatter }),
]);
```

When there are issues, it will produce the following output:

```
warning: "#fff" collides with "#fafafa"
/full/path/atom-one-light.css:23:14
20 |   overflow-x: auto;
21 |   padding: 0.5em;
22 |   color: #383a42;
23 |   background: #fafafa;
                   ^^^^^^^

warning: "#fafafa" collides with "#fff"
/full/path/code.css:5:20
2 |   display: block;
3 |   border: 1px solid var(--content-border-grey);
4 |   padding: 20px;
5 |   background-color: #fff;
                        ^^^^

warning: "#fafafa" collides with "#fff"
/full/path/code-example.css:21:20
18 | .wsg-CodeExample__output {
19 |   padding: 56px;
20 |   border: 1px solid var(--content-border-grey);
21 |   background-color: #fff;
                         ^^^^

warning: "#fafafa" collides with "#fff"
/full/path/code-example.css:34:20
31 |   z-index: 1;
32 |   padding: 4px 8px;
33 |   border: 1px solid var(--content-border-grey);
34 |   background-color: var(--content-background-white);
                         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
warning: "#fff" collides with "#fafafa"
/full/path/content/code-mirror-overrides.css:13:20
10 |
11 | .cm-s-mdn-like.CodeMirror {
12 |   background-image: none;
13 |   background-color: var(--content-background-light);
                         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

warning: "#fff" collides with "#fafafa"
/full/path/index.css:17:20
14 |
15 | body {
16 |   font-family: Market;
17 |   background-color: var(--content-background-light);
                         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

## License

MIT
