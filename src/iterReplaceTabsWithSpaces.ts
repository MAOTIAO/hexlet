import { Context } from './context';

const TAB_TO_SPACES = '    ';

export async function* iterReplaceTabsWithSpaces(
    context: Context,
    lines: AsyncIterable<string>
) {
    for await (const line of lines) {
     