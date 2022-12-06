
import { Readable } from 'stream';
import { iterlinesFromReadable } from './iterLinesFromReadable';

async function toLines(input: Iterable<string>): Promise<string[]> {
    const readable = Readable.from(input);
    const lines = [];
    for await (const line of iterlinesFromReadable(readable)) {
        lines.push(line);
    }
    return lines;
}

test('single line', async () => {
    expect(await toLines('')).toEqual(['']);
    expect(await toLines('one')).toEqual(['one']);
});

test('unix newlines', async () => {
    expect(await toLines('one\ntwo')).toEqual(['one', 'two']);
});

test('windows newlines', async () => {
    expect(await toLines('one\r\ntwo')).toEqual(['one', 'two']);
});

test('leading and trailing newlines', async () => {
    expect(await toLines('\none\n')).toEqual(['', 'one', '']);
});

test('line separated across yields', async () => {
    function* generateLines() {
        yield 'one\ntw';
        yield 'o\nthr';
        yield 'ee';
    }

    expect(await toLines(generateLines())).toEqual(['one', 'two', 'three']);
});

test('mixed', async () => {
    expect(await toLines(['0\n', '1'])).toEqual(['0', '1']);
});

test('fuzz', async () => {
    const chunks = [];
    const lines = [];