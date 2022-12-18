import stream, { Readable, Writable } from 'stream';
import { Context } from './context';
import { iterlinesFromReadable } from './iterLinesFromReadable';
import { iterReplaceTabsWithSpaces } from './iterReplaceTabsWithSpaces';
import { iterSideBySideDiffs } from './iterSideBySideDiffs';
import { iterWithNewlines } from './iterWithNewlines';

export async function transformContentsStreaming(
    context: Context,
    input: Readable,
    output: Writable
): Promise<void> {
    return new Promise((resolve, reject) => {
        const transformedInput 