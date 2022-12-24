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
        const wordLength = endIndex - startIndex;
        // word can fit on current line
        if (wordLength <= budget) {
            curLineEnd = endIndex;
            budget -= wordLength;
            return;
        }

        // word can fit in the new line, so start a new one
        if (wordLength <= width) {
            flushLine();
            curLineEnd = endIndex;
            budget -= wordLength;
            return;
        }

        // word is too long to fit in any line, so lets break it and push each
        // part
        while (startIndex < endIndex) {
            if (budget === 0) {
       