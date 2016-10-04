import * as leftPad from "left-pad";

export default function colorguardFormatter(input: any): string {
  const results: string[] = [];

  for (let message of input.messages) {
    const lines = message.node.source.input.css.split(/\n/g);
    const currentLine = lines[message.line - 1];
    const pad = message.line.toString().length;
    const context = 3;
    let value = message.node.value;
    let column = currentLine.indexOf(value);

    if (column < 0) {
      column = message.column;

      const varMatch = currentLine.match(/var\(--.*\)/);

      if (varMatch) {
        column = varMatch.index;
        value = varMatch[0];
      }
    }

    results.push(`${message.type}: "${message.firstColor}" collides with "${message.secondColor}"`);
    results.push(`${message.node.source.input.file}:${message.line}:${column}`);

    for (let lineNumber = message.line - 1 - context; lineNumber < message.line; lineNumber++) {
      const prefix = leftPad(lineNumber + 1, pad) + " | ";

      if (typeof lines[lineNumber] !== "undefined") {
        results.push(prefix + lines[lineNumber]);
      }

      if (lineNumber === message.line - 1) {
        results.push(Array(column + prefix.length + 1).join(" ") + Array(value.length + 1).join("^"));
      }
    }

    results.push("");
  }

  if (input.messages.length === 1) {
    results.push("");
  }

  return results.join("\n");
}
