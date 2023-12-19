import { Card, SetsList } from "./typedef.ts";
import { sets } from "./main.ts";
import { shuffleArray } from "https://deno.land/x/shuffle_array@v1.0.7/mod.ts";
import { Chrono } from "https://deno.land/x/chrono@v1.3.0/mod.ts";

export function learn(setName: "string") {
    let set = sets[setName]
    for (let i = 6; i > 0; i--) {
        let filtered = set.filter((item) => item.phase == i)
        if (filtered.length > 0) {
            set = filtered
        }
    }
    set = shuffleArray(set).slice(0, 20)
    console.info(`Learning vocabulary in phase ${set[0].phase}`)
    let incorrect: Card[] = []
    for (const i in set) {
        const card = set[i]
        let nextDate: Chrono = new Chrono(new Chrono().toISOString().split('T')[0])
        switch (card.phase) {
            case 1:
                break;
            case 2:
                nextDate = new Chrono(nextDate.addDay(1))
                break;
            case 3:
                nextDate = new Chrono(nextDate.addDay(2))
                break;
            case 4:
                nextDate = new Chrono(nextDate.addDay(4))
                break;
            case 5:
                nextDate = new Chrono(nextDate.addDay(8))
                break;
            case 6:
                nextDate = new Chrono(nextDate.addDay(16))
                break;
            default:
                break;
        }
        if (nextDate > new Chrono()) continue;
        alert(card.source)
        alert(card.translation)
        let correct: string | null = null
        while (correct != "yes" && correct != "no") {
            correct = prompt("Was your answer correct? (yes or no)", "yes")
        }
        if (correct == "no") {
            set[i].phase -= 1
            incorrect.push(card)
        } else {
            set[i].phase += 1
        }
    }
    while (incorrect.length > 0) {
        let card = incorrect.pop()
        alert(card?.source)
        alert(card?.translation)
        let correct: string | null = null
        while (correct != "yes" && correct != "no") {
            correct = prompt("Was your answer correct? (yes or no)", "yes")
        }
        if (correct == "no") {
            incorrect.push(card!)
        }
    }
}