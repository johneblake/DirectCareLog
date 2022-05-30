import type Day from '$lib/entity/day';

export default class Week {
  public startDate?: Date;

  public days: Day[] = []
}