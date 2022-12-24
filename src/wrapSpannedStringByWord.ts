import { SpannedString } from './SpannedString';

const SPACE_REGEX = /\s/;

function getLineBreaksForString(string: string, width: number): number[] {
    const lineBreaks: number[] = [];
    let budget = width;
    let curLineEnd = 0;

    function flushLine() {
        lineBreaks.push(curLineEnd);
        budget = width;
    }

    function pushWord(startIndex: number, endIndex: number) {
        con