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
        INSERTED_LINE_NO_COLOR,
        UNMODIFIED_LINE_COLOR,
        UNMODIFIED_LINE_NO_COLOR,
    } = context;

    // A line number of 0 happens when we read the "No newline at end of file"
    // message as a line at the end of a deleted/inserted file.
    if (line === null || lineNo === 0) {
        yield T().appendString(BLANK_LINE, MISSING_LINE_COLOR);
        return;
    }

    const linePrefix = line?.slice(0, 1) ?? null;
    const lineText = line?.slice(1) ?? null;

    let lineColor: ThemeColor;
    let lineNoColor: ThemeColor;
   