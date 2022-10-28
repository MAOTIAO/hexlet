import shiki from 'shiki';
import { Config } from './config';
import { FormattedString, T } from './formattedString';

/**
 * Internal context object used to pass around config and config-derived
 * constants.
 */
export type Context = Config & {
    SPLIT_DIFFS: boolean;
    LINE_WIDTH: number;
    BLANK_LINE: string;
    HORIZONTAL_SEPARATOR: FormattedString;
    HIGHLIGHTER?: shiki.Highlighter;
};

export async function getContextForConfig(config: Config): Promise<Context> {
    // Only split diffs if there's enough room
    const SPLIT_DIFFS = config.SCREEN_WIDTH >= co