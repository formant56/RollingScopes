export function getLastRequest(): string {
  const localData: string | null = localStorage.getItem('searchKeys');
  if (localData) return localData;
  return '';
}
export function setRequest(request: string): void {
  localStorage.setItem('searchKeys', request);
}
