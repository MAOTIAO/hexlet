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
        return new SpannedString<T>('', [undefined], 0);
    }

    addSpan(startIndex: number, endIndex: number, attribute: T) {
        this._spanMarkers[startIndex] = this._spanMarkers[startIndex] ?? [];
        this._spanMarkers[startIndex]!.push({
            id: this._nextId,
            attribute,
            isStart: true,
        });

        this._spanMarkers[endIndex] = this._spanMarkers[endIndex] ?? [];
        this._spanMarkers[endIndex]!.push({
            id: this._nextId,
            attribute,
            isStart: false,
        });

        this._nextId++;

        return this;
    }

    appendString(string: string, ...attributes: T[]): SpannedString<T> {
        const startIndex = this._string.length;
        const endIndex = startIndex + string.length;

        this._string += string;
        this._spanMarkers = this._spanMarkers.concat(new Array(string.length));

        for (const attribute of attributes) {
            this.addSpan(startIndex, endIndex, attribute);
        }

        return this;
    }

    appendSpannedString(other: SpannedString<T>): SpannedString<T> {
        this._string = this._string.concat(other._string);

        // The trailing span marker of this string and leading span marker of
        // the other string will overlap, so we need to merge it
        const spanMarkers = this._spanMarkers.concat(
            new Array(other._spanMarkers.length - 1)
        );
        const overlappingSpanIndex = this._spanMarkers.length - 1;
        for (
            let otherIndex = 0;
            otherIndex < other._spanMarkers.length;
            otherIndex++
        ) {
            const otherSpans = other._spanMarkers[otherIndex];
            if (otherSpans) {
                const index = otherIndex + overlappingSpanIndex;
                spanMarkers[index] = spanMarkers[index] ?? [];
                spanMarkers[index]?.push(...otherSpans);
            }
        }
        this._spanMarkers = spanMarkers;

        // We don't need to remap the ids of the spans, because they only occur
        // together in one place, `overlappingSpanIndex` and at that index, all
        // the spans of the first string must be closing and all the spans of
        // the second string must be opening.
        this._nextId = Math.max(this._nextId, other._nextId);

        return this;
    }

    slice(
        startIndex: number,
        endIndex: number = this._string.length
    ): SpannedString<T> {
        if (startIndex < 0 || endIndex < 0) {
            throw new Error('Invalid start or end index');
        }
        if (startIndex > this._string.length) {
            startIndex = this._string.length;
        }
        if (endIndex > this._string.length) {
            endIndex = this._string.length;
        }

        const spanMarkers = new Array(endIndex + 1 - startIndex);
        const activeSpansById = new Map<number, Span<T>>();
        