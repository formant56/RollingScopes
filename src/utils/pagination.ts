import { Pages } from './types';

export default function getPages(count: number, current: number): Pages {
  const result: number[] = [];
  if (current > count) current = count;
  let i: number = current - 3 < 1 ? 1 : current - 3;
  const end: number = current + 3 > count ? count : current + 3;
  while (i <= end) {
    result.push(i++);
  }
  return { numbers: result, last: count };
}
