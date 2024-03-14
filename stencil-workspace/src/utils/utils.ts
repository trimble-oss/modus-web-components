export function createGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateRandomNumber(): number {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0];
}

let counter = 0;
export function generateElementId(): string {
  return `mwc_id_${counter++}`;
}

export function convertIconToSVG(iconObject) {
  let svgString = `<svg`;

  Object.keys(iconObject['$attrs$']).forEach((key) => {
    svgString += ` ${key}="${iconObject['$attrs$'][key]}"`;
  });

  svgString += `>`;

  if (iconObject['$children$']) {
    iconObject['$children$'].forEach((child) => {
      let childString = `<${child['$tag$']}`;

      Object.keys(child['$attrs$']).forEach((key) => {
        childString += ` ${key}="${child['$attrs$'][key]}"`;
      });

      if (!child['$children$']) {
        childString += `/>`;
      } else {
        childString += `>`;

        childString += convertIconToSVG(child);
        childString += `</${child['$tag$']}>`;
      }

      svgString += childString;
    });
  }

  svgString += `</svg>`;

  return svgString;
}
