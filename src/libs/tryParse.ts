export function tryParse(data: string): any {
  try {
    return JSON.parse(data);
  } catch {
    return undefined;
  }
}
