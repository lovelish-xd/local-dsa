#!/usr/bin/env node

import { Command } from "commander";
import { handleFetch } from "./core/fetch.js";
import { handleRun } from "./core/run.js";

const program = new Command();

program
  .name("dsa")
  .description("Offline DSA workspace generator")
  .version("0.0.1");

program
  .command("hello")
  .description("Test command")
  .action(() => {
    console.log("CLI is working 🚀");
  });

program
  .command("fetch <url>")
  .description("Fetch a DSA problem and create workspace")
  .action(async (url: string) => {
    await handleFetch(url);
  });

  program
  .command("run")
  .option("-t, --test", "Run with input.txt and compare with expected.txt")
  .description("Run solution locally")
  .action(async (options) => {
    await handleRun(options.test || false);
  });

program.parse();