import { Chalk } from 'chalk';
import { exec } from 'child_process';
import * as util from 'util';
import { Config } from './config';
import { loadTheme } from './themes';
const execAsync = util.promisify(exec);

const GIT_CONFIG_KEY_