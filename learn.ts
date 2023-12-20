import { Card } from "./typedef.ts";
import { sets } from "./main.ts";
import { shuffleArray } from "https://deno.land/x/shuffle_array@v1.0.7/mod.ts";
import { Chrono } from "https://deno.land/x/chrono@v1.3.0/mod.ts";
import { infoIfVerbose, writeSets } from "./functions.ts";

export function learn(
  options: { verbose?: unknown; allCards?: true | undefined },
  setName: string
) {
  const rawSet: Card[] = sets[setName];
  let set = rawSet;
  if (rawSet.length == 0) {
    console.error("You have nothing to learn. Add some cards first.");
    Deno.exit();
  }
  for (let i = 6; i > 0; i--) {
    const filtered = rawSet.filter((item) => item.phase == i);
    if (filtered.length > 0) {
      infoIfVerbose(
        `Discarding cards of phase ${
          filtered[0].phase + 1
        } and replacing them with ${filtered.length} cards of a lower phase`
      );
      set = filtered;
    }
  }
  const incorrect: Card[] = [];
  const today = new Chrono(new Chrono().toISOString().split("T")[0]);
  const fullSet = set;
  for (const card of set) {
    let nextDate: Chrono = new Chrono(new Chrono().toISOString().split("T")[0]);
    switch (card.phase) {
      case 1:
        break;
      case 2:
        nextDate = new Chrono(nextDate.addDay(1));
        break;
      case 3:
        nextDate = new Chrono(nextDate.addDay(2));
        break;
      case 4:
        nextDate = new Chrono(nextDate.addDay(4));
        break;
      case 5:
        nextDate = new Chrono(nextDate.addDay(8));
        break;
      case 6:
        nextDate = new Chrono(nextDate.addDay(16));
        break;
      default:
        break;
    }
    if (nextDate > today) {
      infoIfVerbose(
        `Discarding card ${card.source}, because next date ${nextDate} is after ${today}`
      );
      set.splice(set.indexOf(card), 1);
    }
  }
  if (set.length == 0) {
    console.error("You have nothing to learn today. Hooray! 🎉");
    if (
      prompt(
        "Learn anyway (may impact learning effect and induce burnout)? (yes or no)",
        "no"
      ) == "no" &&
      !options.allCards
    ) {
      Deno.exit();
    } else {
      set = fullSet;
    }
  }
  set = shuffleArray(set).slice(0, 20);
  console.info(`Learning vocabulary in phase ${set[0].phase}`);
  for (const i in set) {
    const card = set[i];
    alert(card.source);
    alert(card.translation);
    let correct: string | null = null;
    while (correct != "yes" && correct != "no") {
      correct = prompt("Was your answer correct? (yes or no)", "yes");
    }
    if (correct == "no") {
      set[i].phase -= 1;
      incorrect.push(card);
    } else {
      set[i].phase += 1;
    }
  }
  while (incorrect.length > 0) {
    const card = incorrect.pop();
    alert(card?.source);
    console.info(card?.translation);
    let correct: string | null = null;
    while (correct != "yes" && correct != "no") {
      correct = prompt("Was your answer correct? (yes or no)", "yes");
    }
    if (correct == "no") {
      incorrect.push(card!);
    }
  }
  sets[setName] = set
  writeSets(sets)
}
