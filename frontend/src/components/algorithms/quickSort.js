export const quickSort = (array) => {
    const animations = [];
    const arr = array.slice();
  
    const partition = (low, high) => {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        animations.push({ type: "compare", indices: [j, high] });
        if (arr[j] < pivot) {
          i++;
          animations.push({ type: "swap", indices: [i, j] });
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      animations.push({ type: "swap", indices: [i + 1, high] });
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      return i + 1;
    };
  
    const quick = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        quick(low, pi - 1);
        quick(pi + 1, high);
      }
    };
  
    quick(0, arr.length - 1);
    return animations;
  };
  