import * as fs from "fs-extra";
import * as path from "path";
import * as tmp from "tmp";

import { prepare } from "../src/index";

const context = {
  nextRelease: {
    type: "major" as const,
    gitTag: "2.0.0",
    version: "2.0.0",
    notes: "",
    gitHead: "asdfasdf",
  },
  logger: {
    log: jest.fn(),
    error: console.error,
  },
  env: process.env,
};

let d: tmp.DirSyncObject;

async function assertFileContentsContain(name: string, expected: string) {
  const actual = await fs.readFileSync(path.join(name), "utf-8");
  expect.stringContaining(expected);
}

test("prepare should replace using regex", async () => {
  fs.copySync("__tests__/project", ".");
  await prepare({}, context);

  await assertFileContentsContain(
    "pubspec.yaml",
    `__VERSION__ = "${context.nextRelease.version}"`
  );
});
