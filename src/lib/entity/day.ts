import type Entry from '$lib/entity/entry';

export default class Day {
  public index?: number;

  public entries: Entry[] = []
}