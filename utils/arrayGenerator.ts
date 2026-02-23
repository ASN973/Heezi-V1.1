export default function* arrayGenerator(arr: any[]) {
  for (const item of arr) {
    yield item;
  }
}

export function* arrGenWithProgress(arr: any[]) {
  const total = arr.length;
  for (let i = 0; i < total; i++) {
    const percent = Math.ceil(((i + 1) / total) * 100);
    yield { value: arr[i], percent };
  }
}

// Example:
