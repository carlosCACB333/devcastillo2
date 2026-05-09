import { Route } from 'next';

export class UrlQueryBuilder {
  private constructor(
    private basePath: Route,
    private params: URLSearchParams,
  ) {}

  static create(basePath: Route) {
    return new UrlQueryBuilder(basePath, new URLSearchParams());
  }

  set(key: string, value: string | number | boolean | undefined) {
    const next = new URLSearchParams(this.params);

    if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }

    return new UrlQueryBuilder(this.basePath, next);
  }

  build() {
    const queryString = this.params.toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;
    return url as Route;
  }
}
