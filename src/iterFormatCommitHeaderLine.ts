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
        COMMIT_HEADER_COLOR,
        COMMIT_DATE_COLOR,
        COMMIT_SHA_COLOR,
        SCREEN_WIDTH,
    } = context;

    const [label] = line.split(' ', 1);

    let labelColor;
    switch (label) {
        case 'commit':
            labelColor = COMMIT_S