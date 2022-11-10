import { Chalk } from 'chalk';
import { exec } from 'child_process';
import * as util from 'util';
import { Config } from './config';
import { loadTheme } from './themes';
const execAsync = util.promisify(exec);

const GIT_CONFIG_KEY_PREFIX = 'split-diffs';
const GIT_CONFIG_LINE_REGEX = new RegExp(
    `${GIT_CONFIG_KEY_PREFIX}\.([^=]+)=(.*)`
);

async function getRawGitConfig() {
    const { stdout } = await execAsync('git config -l');

    const rawConfig: Record<string, string> = {};
    for (const line of stdout.trim().split('\n')) {
        const match = line.match(GIT_CONFIG_LINE_REGEX);
        if (!match) {
            continue;
        }
        const [, key, value] = match;
        rawConfig[key] = value;
    }
    return rawConfig;
}

// TODO: Make this less manual
export async function getGitConfig(
    screenWidth: number,
    chalk: Chalk
): Promise<Config> {
    const rawConfig = await getRawGitConfig();

    // Defaults to "dark"
    const themeName = rawConfig['theme-name'] ?? 'dark';
    const theme = loadTheme(themeName);

    // Defaults to the theme's setting
    const syntaxHighlightingTheme =
        rawConfig['syntax-highlighting-theme'] ??
        theme.SYNTAX_HIGHLIGHTING_THEME;

    // Defaults to true
    const wrapLines = rawConfig['wrap-lines'] === 'false' ? false : true;

    // Defaults to true
    const highlightLineChange