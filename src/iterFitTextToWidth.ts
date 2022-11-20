import { Context } from './context';
import { FormattedString } from './formattedString';
import { ThemeColor } from './themes';
import { wrapSpannedStringByWord } from './wrapSpannedStringByWord';

/**
 * Wraps or truncates the given line to into the allowed width, depending on
 * the config.
 */
export function* iterFitTextToWidth(
    context: Context,
    formattedString: FormattedString,
    width: number,
    backgroundColor?: ThemeColor
): Iterable<FormattedString> {
    if (context.WRAP_LINES) {
        for (const wrappedLine of wrapSpannedStringByWord(
            formattedString,
  