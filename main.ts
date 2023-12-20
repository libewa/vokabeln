#!/usr/bin/env -S deno run

import {
  Command,
  HelpCommand,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { promptNewVocab } from "./add.ts";
import { SetsList } from "./typedef.ts";
import { learn } from "./learn.ts";
import { list } from "./list.ts";
import { underline } from "https://deno.land/std@0.196.0/fmt/colors.ts";
import { code } from "./functions.ts";

export const sets: SetsList = JSON.parse(localStorage.getItem("sets") ?? "{}");

export let verboseOutput: boolean;

const command = new Command()
  .name("vokabeln")
  .version("0.1.0")
  .description("Command line vocabulary learning tool")
  .globalOption("-v --verbose", "Get verbose (debugging) output.")
  .globalAction(({ verbose }) => {
    if (verbose != undefined) {
      verboseOutput = verbose;
    }
  })
  .action(() => {
    command.showHelp();
  })
  .example("Adding new cards", code("vokabeln add latin"))
  .example("List existing cards", code("vokabeln list latin"))
  .example("Learn cards", code("vokabeln learn latin"))
  .command("add", "Add new cards")
  .example("Adding new cards", code("vokabeln add latin"))
  .arguments("<set:string>")
  // deno-lint-ignore no-explicit-any
  .action((_: any, set: string) => {
    if (sets[set] == undefined) {
      console.info(`Adding new set "${set}"`);
    } else {
      if (verboseOutput) {
        console.info(`Using existing set "${set}"`);
      }
    }
    while (true) {
      promptNewVocab(set);
    }
  })
  .command("list", "List existing cards")
  .example("List existing cards", code("vokabeln list latin"))
  .example("Save existing cards to file", code("vokabeln list latin > vocab.txt"))
  .arguments("<set:string>")
  .action(list)
  .command("learn", "Test your vocabulary knowledge")
  .option("-a --all-cards", "Learn all cards, even if they're not due today")
  .example("Learn cards", code("vokabeln learn latin"))
  .example(
    "Learn cards, including ones not due",
    `${code("vokabeln learn -a latin")} \n${underline(
      "This may reduce the learning effect"
    )}`
  )
  .arguments("<set:string>")
  .action(learn)
  .command("help", new HelpCommand())
  .global();

await command.parse();
