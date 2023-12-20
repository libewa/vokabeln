import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { Row, Table } from "https://deno.land/x/cliffy@v1.0.0-rc.3/table/mod.ts";
import { promptNewVocab } from "./add.ts";
import { SetsList } from "./typedef.ts";
import { learn } from "./learn.ts";

// deno-lint-ignore prefer-const
export let sets: SetsList = JSON.parse(localStorage.getItem("sets") ?? "{}")

await new Command()
  .name("vokabeln")
  .version("0.1.0")
  .description("Command line vocabulary learning tool")
  .command("add", "Add new vocabulary")
  .arguments("<set:string>")
  .action((_options: void, set: string) => {
    if (sets[set] == undefined) {
      console.info(`Adding new set "${set}"`)
    } else {
      console.info(`Using existing set "${set}"`)
    }
    while (true) {
      promptNewVocab(set)
    }
  })
  .command("list", "List existing vocabulary")
  .arguments("<set:string>")
  .action((_options: void , set: string) => {
    const table = new Table()
      .header(new Row("Source", "Translations", "Phase").border())
    for (const voc of sets[set]) {
      table.push([voc.source, voc.translation, voc.phase])
    }
    table.border().render()
    Deno.exit(0)
  })
  .command("learn", "Test your vocabulary knowledge")
  .arguments("<set:string>")
  .action(learn)
  .parse(Deno.args);


export function writeSets(sets: SetsList, key = "sets") {
  localStorage.setItem(key, JSON.stringify(sets))
}

