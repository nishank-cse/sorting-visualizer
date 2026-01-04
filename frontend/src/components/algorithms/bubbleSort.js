// simple Bubble Sort animation logic
export const bubbleSort = (array) => {
    const animations = [];
    let arr = array.slice();
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        animations.push({ type: "compare", indices: [j, j + 1] });
        if (arr[j] > arr[j + 1]) {
          animations.push({ type: "swap", indices: [j, j + 1] });
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return animations;
  };
  