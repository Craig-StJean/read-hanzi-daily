import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

import ReadingHistory from '$lib/Classes/ReadingHistory';

export const readingHistory: Writable<ReadingHistory> = localStorageStore('readingHistory', new ReadingHistory());