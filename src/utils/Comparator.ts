
export class Comparator<T = number> {
    private compare(a: T, b: T): number {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1; // eslint-disable-line no-magic-numbers
    }

    constructor(compareFn?: (a: T, b: T) => number) {
        if (compareFn) {
            this.compare = compareFn;
        }
    }

    public isEqual(a: T, b: T): boolean {
        return this.compare(a, b) === 0;
    }

    public isLessThan(a: T, b: T): boolean {
        return this.compare(a, b) < 0;
    }

    public isGreaterThan(a: T, b: T): boolean {
        return this.compare(a, b) > 0;
    }

    public isLessThanOrEqual(a: T, b: T): boolean {
        return this.isLessThan(a, b) || this.isEqual(a, b);
    }

    public isGreaterThanOrEqual(a: T, b: T): boolean {
        return this.isGreaterThan(a, b) || this.isEqual(a, b);
    }
}
