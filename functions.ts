import { verboseOutput } from "./main.ts";
import { SetsList } from "./typedef.ts";
import { gray, inverse } from "https://deno.land/std@0.196.0/fmt/colors.ts";

export function writeSets(sets: SetsList, key = "sets") {
  localStorage.setItem(key, JSON.stringify(sets));
}

export function code(str: string): string {
  return inverse(gray(str));
}

// deno-lint-ignore no-explicit-any
export function infoIfVerbose(...data: any[]) {
  if (verboseOutput) {
    console.info(data);
  }
}
