export class SessionProvider {
  static get(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      try {
        const value = sessionStorage.getItem(key);
        resolve(value);
      } catch (err) {
        reject(err);
      }
    });
  }

  static set(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        sessionStorage.setItem(key, value);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  static remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        sessionStorage.removeItem(key);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
