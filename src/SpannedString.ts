/**
 * A string whose substrings can be marked by arbitrary objects.
 *
 * The string can be iterated over to get substrings with the list of objects
 * applied to them, in the order they were applied.
 */
type Span<T> = {
    id: number;
    attribute: T;
    isStart: boolean;
};

export class SpannedString<T> {
    private _string: string = '';
    private _spanMarkers: (Span<T>[] | undefined)[] = [undefined];
    private _nextId: number = 0;

    constructor(
        string: string,
        spans: (Span<T>[] | undefined)[],
        nextId: number
    ) {
        this._string = string;
        this._spanMarkers = spans;
        this._nextId = nextId;
    }

    static create<T>() {
        return new SpannedStr