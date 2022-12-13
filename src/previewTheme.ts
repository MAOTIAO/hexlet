import chalk from 'chalk';
import { execSync } from 'child_process';
import { Readable, Writable } from 'stream';
import terminalSize from 'term-size';
import { Config } from './config';
import { getContextForConfig } from './context';
import { loadTheme } from './themes';
import { transformContentsStreaming } from './transformContentsStreaming';

const CONFIG = {
    CHALK: chalk,
    MIN_LINE_WIDTH: 40,
    WRAP_LINES: true,
    HIGHLIGHT_LINE_CHANGES: true,
};

async function previewTheme(themeName: string, content: string) {
    const theme = loadTheme(themeName);

    const { rows, columns } = terminalSize();
    const conf