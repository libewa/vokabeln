import { sets } from "./main.ts";
import { writeSets } from "./functions.ts";
import { Card } from "./typedef.ts";
import { infoIfVerbose } from "./functions.ts";

export function addVocab(source: string, translation: string, set: string) {
  const card = new Card(set, source, translation, 1);
  if (sets[set] == undefined) {
    infoIfVerbose(`Saving to existing set "${set}"`);
    sets[set] = [card];
  } else {
    infoIfVerbose(`Saving to new set "${set}"`);
    sets[set].push(card);
  }
  writeSets(sets);
}

export function promptNewVocab(set: string) {
  const source = prompt("Source value: ");
  const translation = prompt("Translation: ");
  if (source == undefined || translation == undefined) {
    console.error("Please provide a value for both fields.");
  } else {
    infoIfVerbose(
      `Adding card with these values: source: ${source}; translation: ${translation}; set: ${set}`
    );
    addVocab(source, translation, set);
  }
}
