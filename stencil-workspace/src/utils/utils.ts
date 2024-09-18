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

export function kebabCase(string: string): string {
  return string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join('-')
    .toLowerCase();
}
