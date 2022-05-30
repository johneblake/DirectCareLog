import type Week from "$lib/entity/week";

export default class Year {
  constructor(public year: number) { }

  public weeks: Week[] = [];
}