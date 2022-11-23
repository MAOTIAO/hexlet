import { Context } from './context';
import { T, FormattedString } from './formattedString';
import { iterFitTextToWidth } from './iterFitTextToWidth';

export function* iterFormatCommitBodyLine(
    context: Context,
    line: string,
    isFirstLine: boolean
): Iterable<FormattedString> {
    const { COMMIT_TITLE_COLOR, COMMIT_MESSAGE_COLOR, SCREEN_WIDTH } = context;

    const formattedLine =