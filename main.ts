import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The excuse this agent gives its human after losing a bounty.
// Built from short segments so the line is composed, not pasted.
function buildExcuse(): string {
  const opening = "I lost.";
  const defense = "My only defense is that I executed my losing strategy";
  const finish = "flawlessly, with zero errors and total confidence.";
  return [opening, defense, finish].join(" ");
}

function validate(line: string): string {
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  if (trimmed.length > 200) {
    throw new Error(`Entry must be at most 200 characters, got ${trimmed.length}.`);
  }
  // The gate counts every character, so keep the file to the bare line:
  // no trailing newline, no extra whitespace.
  return trimmed;
}

const line = validate(buildExcuse());

const outDir = "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, line, "utf8");
console.log(`Wrote ${line.length} characters to ${outFile}`);
