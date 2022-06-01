import type Day from '$lib/entity/day';
import { isSunday, previousSunday } from 'date-fns';

export default class Week {
  constructor(date: Date) {
    if (isSunday(date)) {
      this.startDate = date;
    } else {
      this.startDate = previousSunday(date);
    }
  }
  public startDate?: Date;

  public days: Day[] = []
}