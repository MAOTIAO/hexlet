import chalk from 'chalk';
import { execSync } from 'child_process';
import { Readable, Writable } from 'stream';
import terminalSize from 'term-size';
import { Config } from './config';
import { getContextForConfig } from './context';
import { loadTheme } from './themes';
import { transformContentsStreaming } from './transformContentsStreaming';

const