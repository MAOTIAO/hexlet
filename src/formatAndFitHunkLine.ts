import { Change } from 'diff';
import { Context } from './context';
import { FormattedString, T } from './formattedString';
import { highlightChangesInLine } from './highlightChangesInLine';
import { highlightSyntaxInLine } from './highlightSyntaxInLine';
import { iterFitTextToWidth } from './iterFitTextToWidth';
import { ThemeColor } from './themes';

// Assuming people aren't editing lines >=100k lines
const LINE_NUMBER_WIDTH = 5;

export function* formatAndFitHunkLine(
    context: Context,
    fileName: string,
    lineNo: number,
    line: string | null,
    changes: Change[] | null
): Iterable<FormattedString> {
    const {
        BLANK_LINE,
        LINE_WIDTH,
        MISSING_LINE_COLOR,
        DELETED_LINE_COLOR,
        DELETED_LINE_NO_COLOR,
        INSERTED_LINE_COLOR,
       