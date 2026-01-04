export const mergeSort = (array) => {
    const animations = [];
    const arr = array.slice();
  
    const merge = (l, r) => {
      let result = [], i = 0, j = 0;
      while (i < l.length && j < r.length) {
        animations.push({ type: "compare", indices: [i, j] });
        if (l[i] < r[j]) result.push(l[i++]);
        else result.push(r[j++]);
      }
      return [...result, ...l.slice(i), ...r.slice(j)];
    };
  
    const divide = (a) => {
      if (a.length <= 1) return a;
      const mid = Math.floor(a.length / 2);
      const left = divide(a.slice(0, mid));
      const right = divide(a.slice(mid));
      return merge(left, right);
    };
  
    divide(arr);
    return animations;
  };
  