export const insertionSort = (array) => {
    const animations = [];
    const arr = array.slice();
  
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        animations.push({ type: "compare", indices: [j, j + 1] });
        animations.push({ type: "swap", indices: [j, j + 1] });
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    return animations;
  };
  