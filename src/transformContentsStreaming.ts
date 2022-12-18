import stream, { Readable, Writable } from 'stream';
import { Context } from './context';
import { iterlinesFromReadable } from './iterLinesFromReadable';
import { iterReplaceTabsWithSpaces } from './iterReplaceTabsWithSpaces';
import { iterSideBySideDiffs } from './iterS