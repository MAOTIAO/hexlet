import shiki from 'shiki';
import { Config } from './config';
import { FormattedString, T } from './formattedString';

/**
 * Internal context object used to pass around config and config-derived
 * constants.
 */
export type Context = Config & {
    SPLIT_DIFFS: boolean;
    LINE_W