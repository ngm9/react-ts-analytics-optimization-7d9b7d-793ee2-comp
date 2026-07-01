import { AnalyticsItem, TabId } from './types';

export function fetchTabData(tab: TabId): Promise<AnalyticsItem[]> {
  return new Promise((resolve) => {
    const items: AnalyticsItem[] = [];
    let size = 0;
    if (tab === 'overview') {
      size = 800;
    } else if (tab === 'candidates') {
      size = 2000;
    } else {
      size = 2000;
    }
    const now = Date.now();
    for (let index = 0; index < size; index += 1) {
      const id = index + 1;
      const baseScore = tab === 'candidates' ? 50 : 60;
      const score = baseScore + (index % 40);
      const attempts = 1 + (index % 5);
      const timestamp = new Date(now - index * 60000).toISOString();
      const namePrefix = tab === 'overview' ? 'Assessment' : tab === 'candidates' ? 'Candidate' : 'Assessment';
      const item: AnalyticsItem = {
        id,
        name: namePrefix + ' ' + id.toString(),
        score,
        attempts,
        createdAt: timestamp
      };
      items.push(item);
    }
    const delay = tab === 'overview' ? 400 : 600;
    setTimeout(() => {
      resolve(items);
    }, delay);
  });
}
