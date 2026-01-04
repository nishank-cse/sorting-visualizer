export const heapSort = (array) => {
    const animations = [];
    const arr = array.slice();
  
    const heapify = (n, i) => {
      let largest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
  
      if (l < n && arr[l] > arr[largest]) largest = l;
      if (r < n && arr[r] > arr[largest]) largest = r;
      if (largest !== i) {
        animations.push({ type: "swap", indices: [i, largest] });
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(n, largest);
      }
    };
  
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) heapify(arr.length, i);
    for (let i = arr.length - 1; i > 0; i--) {
      animations.push({ type: "swap", indices: [0, i] });
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(i, 0);
    }
    return animations;
  };
  