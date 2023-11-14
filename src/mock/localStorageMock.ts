class LocalStorageMock {
  store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  get length() {
    return Object.keys(this.store).length;
  }

  getItem = (key: string) => this.store[key] || null;

  setItem = (key: string, value: string) => (this.store[key] = value);

  removeItem = (key: string) => delete this.store[key];

  clear = () => (this.store = {});

  key = (index: number) => {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  };
}

global.localStorage = new LocalStorageMock();
