import { Chrono } from "https://deno.land/x/chrono@v1.3.0/mod.ts";

export class Card {
  parentSetName: string;
  source: string;
  translation: string;
  phase: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  id = crypto.randomUUID()
  dateLastLearned = new Chrono().toISOString().split('T')[0]

  constructor(parentSetName: string, source: string, translation: string, phase: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    this.parentSetName = parentSetName;
    this.source = source;
    this.translation = translation;
    this.phase = phase;
  }
}
export interface SetsList {
  [Key: string]: Card[];
}
