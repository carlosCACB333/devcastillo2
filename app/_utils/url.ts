import { Route } from 'next';

export class UrlQueryBuilder {
  private params: URLSearchParams;

  constructor(private basePath: Route) {
    this.params = new URLSearchParams();
  }

  set(key: string, value: string | number | boolean | undefined) {
    if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
      this.params.delete(key);
    } else {
      this.params.set(key, String(value));
    }
    return this;
  }

  build() {
    const queryString = this.params.toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;
    return url as Route;
  }
}
