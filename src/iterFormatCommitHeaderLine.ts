import { Context } from './context';
import { T, FormattedString } from './formattedString';
import { iterFitTextToWidth } from './iterFitTextToWidth';

export function* iterFormatCommitHeaderLine(
    context: Context,
    line: string
): Iterable<FormattedString> {
    const {
        COMMIT_HEADER_LABEL_COLOR,
        COMMIT_AUTHOR_COLOR,
    