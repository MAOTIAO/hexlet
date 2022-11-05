import { Context } from './context';
import { SpannedString } from './SpannedString';
import { reduceThemeColors, ThemeColor } from './themes';

export class FormattedString extends SpannedString<ThemeColor> {}

export function T(): Formatted