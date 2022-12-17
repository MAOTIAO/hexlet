import { mergeColors } from './themes';

test('simple', () => {
    expect(mergeColors()).toEqual(undefined);

    expect(mergeColors({ r: 1, g: 2, b: 3, a: 0 })).toEqual({
        r: 1,
        g: 2,
        b: 3,
        a: 0,
    });
});

test('second color wins w