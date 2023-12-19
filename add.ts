import { sets, writeSets } from "./main.ts";
import { Card } from "./typedef.ts";


export function addVocab(source: string, translation: string, set: string) {
  let card = new Card(set, source, translation, 1);
  if (sets[set] == undefined) {
    sets[set] = [card];
  } else {
    sets[set].push(card);
  }
  writeSets(sets);
}

export function promptNewVocab(set: string) {
  let source = prompt("Source value: ");
  let translation = prompt("Translation: ");
  if (source == undefined || translation == undefined) {
    console.error("Please provide a value for both fields.");
  } else {
    addVocab(source, translation, set);
  }
}
