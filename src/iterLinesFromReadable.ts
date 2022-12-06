import * as stream from 'stream';

const NEWLINE_REGEX = /\r\n|\n/g;

/**
 * Given a string, yields each part in the string terminated by a newline and
 * returns the final part without a newline.
 */
function* yieldLinesFromString(string: string) {
    let lastIndex = 0;