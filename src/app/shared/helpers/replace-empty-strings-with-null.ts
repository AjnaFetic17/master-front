export function replaceEmptyStringsWithNull(object: any): any {
  for (const key in object) {
    if (typeof object[key] === 'object' && object[key]) {
      replaceEmptyStringsWithNull(object[key]);
    } else if (typeof object[key] === 'string' && object[key]?.trim() === '') {
      object[key] = null;
    }
  }

  return object;
}
