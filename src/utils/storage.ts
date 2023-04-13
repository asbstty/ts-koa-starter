const storage: Record<string, any> = {}

export function setItem(key: string, value: any) {
  storage[key] = value;
}

export function getItem(key:string) {
  return storage[key];
}