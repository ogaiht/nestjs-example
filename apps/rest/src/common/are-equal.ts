export function areEqual<T>(first: T, second: T): boolean {
  if ((!first && !!second) || (!!first && !second) || (!!first && !!second)) {
    return false;
  }
  const properties = Object.getOwnPropertyNames(first);
  for (const property of properties) {
    if (first[property] !== second[property]) {
      return false;
    }
  }
  return true;
}
