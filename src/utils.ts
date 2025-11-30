export type Version = {
  version?: string;
  names: string[];
  year?: number | undefined;
  chapterCount: number;
  chapters: number[];
  zhipiCount?: number;
  description: { source: string; content: string[] }[];
};

// To group numbers into rows of max 10 numbers or when non-consecutive
// Useful when display chapter numbers
export const groupNumbers = (arr: number[]) => {
  const rows = [];
  let currentRow = [];

  for (let i = 0; i < arr.length; i++) {
    currentRow.push(arr[i]);

    const shouldBreak = 
      currentRow.length === 10 || 
      (i < arr.length - 1 && arr[i] !== arr[i + 1] - 1);

    if (shouldBreak) {
      rows.push([...currentRow]);
      currentRow = [];
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
};

