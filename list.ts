import {
  Row,
  Table,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/table/mod.ts";
import { sets } from "./main.ts";

// deno-lint-ignore no-explicit-any
export function list(_: any, set: string) {
  const table = new Table().header(
    new Row("Source", "Translations", "Phase").border()
  );
  for (const voc of sets[set]) {
    table.push([voc.source, voc.translation, voc.phase == 7 ? "Done" : voc.phase]);
  }
  table.border().render();
  Deno.exit(0);
}
