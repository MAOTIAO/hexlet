import path from 'path';
import shiki from 'shiki';
import { FormattedString } from './formattedString';
import { parseColorDefinition, ThemeColor } from './themes';
export type HighlightedText = [string, ThemeColor | null];

export function highlightSyntaxInLine(
    line: FormattedString,
    fileName: string,
    highlighter?: shiki.Highlighter
): void {
    if (!highligh