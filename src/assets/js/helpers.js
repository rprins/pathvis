export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const lineLine = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  // calculate the distance to intersection point
  const uA =
    ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  const uB =
    ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
};

export const lineRect = (x1, y1, x2, y2, rx, ry, rw, rh) => {
  // check if the line has hit any of the rectangle's sides
  // uses the Line/Line function below
  let left = lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
  let right = lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
  let top = lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
  let bottom = lineLine(
    x1,
    y1,
    x2,
    y2,
    rx,
    ry + rh,
    rx + rw,
    ry + rh,
  );

  // if ANY of the above are true, the line
  // has hit the rectangle
  if (left || right || top || bottom) {
    return true;
  }
  return false;
};
