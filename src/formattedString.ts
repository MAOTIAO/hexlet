import { Context } from './context';
import { SpannedString } from './SpannedString';
import { reduceThemeColors, ThemeColor } from './themes';

export class FormattedString extends SpannedString<ThemeColor> {}

export function T(): FormattedString {
    return FormattedString.create();
}

export function applyFormatting(
    context: Context,
    string: FormattedString
): string {
    const { CHALK, DEFAULT_COLOR } = context;

    let formattedString = '';
    for (const [substring, colors] of string.iterSubstrings()