export const selectionSort = (array) => {
  const animations = [];
  const arr = array.slice();

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push({ type: "compare", indices: [minIdx, j] });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      animations.push({ type: "swap", indices: [i, minIdx] });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return animations;
};
