import shiki from 'shiki';
import { T } from './formattedString';
import { highlightSyntaxInLine } from './highlightSyntaxInLine';

// TODO: load languages on-demand
test.skip('highlighting should load languages on-demand', async () => {
    const string = 'one `two` three';
    const referenceString = T().appendString(string);
    const testString = T().appendString(string);

    {
        const referenceHighlig