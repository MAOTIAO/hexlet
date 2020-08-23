
import { SpannedString } from './SpannedString';

function S() {
    return SpannedString.create<string>();
}

function apply(string: SpannedString<string>) {
    return Array.from(string.iterSubstrings())
        .map(([substring, tags]) => {
            let s = substring;
            for (const tag of tags) {
                s = `<${tag}>${s}</${tag}>`;
            }
            return s;
        })
        .join('');
}

function format(string: string, spans: [number, number, string][]) {
    const s = S().appendString(string);
    for (const span of spans) {
        s.addSpan(...span);
    }
    return apply(s);
}

test('no spans', () => {
    expect(format('one two', [])).toEqual('one two');
});

test('single span', () => {
    expect(format('one two', [[0, 3, 'b']])).toEqual('<b>one</b> two');

    expect(format('one two', [[3, 4, 'b']])).toEqual('one<b> </b>two');

    expect(format('one two', [[4, 7, 'b']])).toEqual('one <b>two</b>');
});

test('non-overlapping spans', () => {
    expect(
        format('one two', [
            [0, 3, 'b'],
            [4, 7, 'i'],
        ])
    ).toEqual('<b>one</b> <i>two</i>');

    expect(
        format('one two', [
            [4, 7, 'i'],
            [0, 3, 'b'],
        ])
    ).toEqual('<b>one</b> <i>two</i>');
});

test('adjacent spans', () => {
    expect(
        format('one two', [
            [0, 4, 'b'],
            [4, 7, 'i'],
        ])
    ).toEqual('<b>one </b><i>two</i>');
});

test('containing spans', () => {
    expect(
        format('one two', [
            [2, 4, 'b'],
            [0, 7, 'i'],
        ])
    ).toEqual('<i>on</i><i><b>e </b></i><i>two</i>');

    expect(
        format('one two three', [
            [0, 3, 'i'],
            [4, 7, 'b'],
            [0, 13, 'u'],
        ])
    ).toEqual('<u><i>one</i></u><u> </u><u><b>two</b></u><u> three</u>');

    expect(
        format('one two', [
            [1, 6, 'i'],
            [2, 5, 'b'],
            [3, 4, 'u'],
        ])
    ).toEqual(
        'o<i>n</i><b><i>e</i></b><u><b><i> </i></b></u><b><i>t</i></b><i>w</i>o'
    );
});

test('overlapping spans', () => {
    expect(
        format('one two', [
            [0, 4, 'b'],
            [3, 7, 'i'],
        ])
    ).toEqual('<b>one</b><i><b> </b></i><i>two</i>');

    expect(
        format('one two', [
            [3, 7, 'i'],
            [0, 4, 'b'],
        ])
    ).toEqual('<b>one</b><b><i> </i></b><i>two</i>');
});

test('order of application', () => {
    expect(