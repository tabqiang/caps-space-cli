#!/usr/bin/env ts-node

import { Command } from "commander";
import degit from "degit";

const program = new Command();

program
  .version("1.0.0")
  .description("Scaffold tool")
  .option("-t, --type <type>", "Project type (monorepo or vue3-ts)", "vue3-ts")
  .option("-d, --directory <directory>", "Target directory", "my-project")
  .parse(process.argv);

const options = program.opts();

const repoMap: { [key: string]: string } = {
  monorepo: "",
  "vue3-ts": "",
};

const repo = repoMap[options.type];

if (!repo) {
  console.error("Invalid project type");
  process.exit(1);
}

const emitter = degit(repo, {
  cache: false,
  force: true,
  verbose: true,
});

emitter
  .clone(options.directory)
  .then(() => {
    console.log("Project created successfully");
  })
  .catch((err) => {
    console.error("Project creation failed", err);
  });
