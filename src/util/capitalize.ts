export function capitalize(string: string): string {
  if (string.length < 1) {
    return string;
  }

  return string.substr(0, 1).toUpperCase() + string.substring(1);
}
