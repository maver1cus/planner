class Storage {
  save(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: string): string {
    const data = localStorage.getItem(key);

    if (data === null) {
      return '';
    }

    return data;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export const storage = new Storage();
