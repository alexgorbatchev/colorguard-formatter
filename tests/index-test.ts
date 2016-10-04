/// <reference path="../node_modules/@types/mocha/index.d.ts"/>

import * as postcss from "postcss";
import * as colorguard from "colorguard";
import * as reporter from "postcss-reporter";
import { expect } from "chai";
import { readFileSync } from "fs";

import formatter from "../src/index";

describe("postcss-colorguard-reporter", () => {
  it("does not work", () => {
    const instance = postcss([
      colorguard(),
      reporter({ formatter }),
    ]);

    const results: string[] = [];
    const log = console.log;

    console.log = function(...args: string[]): void {
      results.push(...args);
    };

    return instance.process(
      readFileSync(`${__dirname}/fixture.css`, "utf8"),
      {
        from: "fixture.css",
        map: { inline: true },
      }
    )
    .then(() => {
      console.log = log;
      expect(results.join().split("\n")).to.deep.equal([
        `warning: "red" collides with "#f10"`,
        `/Users/agorbatchev/1/postcss-colorguard-reporter/fixture.css:3:20`,
        `1 | h1 {`,
        `2 |   color: red;`,
        `3 |   background-color: #f10;`,
        `                        ^^^^`,
        ``,
        ``,
      ]);
    });
  });
});
