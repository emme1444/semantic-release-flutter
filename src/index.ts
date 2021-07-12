import {readFileSync, writeFileSync} from 'fs';
import { load, dump } from 'js-yaml';

import { Context } from "semantic-release";

export async function prepare(
  _: object,
  context: Context
): Promise<void> {
  const content = readFileSync('pubspec.yaml', 'utf-8');
  const obj = load(content) as {version: string}
  obj.version = `${context.nextRelease.version}+${new Date().getTime().toString().slice(0, 10)}`
  writeFileSync('pubspec.yaml', dump(obj), {encoding: 'utf-8'})
}
