
import { Readable, Writable } from 'stream';
import { Config } from './config';
import { getContextForConfig } from './context';
import { ThemeColorName } from './themes';
import { transformContentsStreaming } from './transformContentsStreaming';

const TEST_THEME = Object.fromEntries(
    Object.keys(ThemeColorName).map((name) => [name, {}])
);

const replaceColoredText = () => (text: string) => text.replace(/./g, '░');

const TEST_CONFIG: Config = {
    // Provide a fake chalk implementation to make it easier to read snapshots
    CHALK: {
        // @ts-expect-error
        rgb: replaceColoredText,
        // @ts-expect-error
        bgRgb: replaceColoredText,
    },
    SCREEN_WIDTH: 120,
    MIN_LINE_WIDTH: 60,
    WRAP_LINES: false,
    HIGHLIGHT_LINE_CHANGES: false,
    ...TEST_THEME,
};

const CONFIG_OVERRIDES: Record<string, Partial<Config>> = {
    splitWithoutWrapping: {
        SCREEN_WIDTH: 80,
        MIN_LINE_WIDTH: 40,
        WRAP_LINES: false,
    },
    splitWithWrapping: {
        SCREEN_WIDTH: 80,
        MIN_LINE_WIDTH: 40,
        WRAP_LINES: true,
    },
    unifiedWithWrapping: {
        SCREEN_WIDTH: 80,
        MIN_LINE_WIDTH: 80,
        WRAP_LINES: true,
    },
    // This is in split mode
    inlineChangesHighlighted: {
        HIGHLIGHT_LINE_CHANGES: true,
        DELETED_WORD_COLOR: { color: { r: 255, g: 0, b: 0, a: 255 } },
        INSERTED_WORD_COLOR: { color: { r: 0, g: 255, b: 0, a: 255 } },
    },
    unifiedWithInlineChangesHighlighted: {
        SCREEN_WIDTH: 80,
        MIN_LINE_WIDTH: 80,
        HIGHLIGHT_LINE_CHANGES: true,
        DELETED_WORD_COLOR: { color: { r: 255, g: 0, b: 0, a: 255 } },
        INSERTED_WORD_COLOR: { color: { r: 0, g: 255, b: 0, a: 255 } },
    },
    syntaxHighlighted: {
        SCREEN_WIDTH: 80,
        MIN_LINE_WIDTH: 40,
        WRAP_LINES: false,
        SYNTAX_HIGHLIGHTING_THEME: 'dark-plus',
    },
};

for (const [configName, configOverride] of Object.entries(CONFIG_OVERRIDES)) {
    async function transform(input: string): Promise<string> {
        const testConfig: Config = {
            ...TEST_CONFIG,
            ...configOverride,
        };
        const context = await getContextForConfig(testConfig);

        let string = '';
        await transformContentsStreaming(
            context,
            Readable.from(input),
            new (class extends Writable {
                write(chunk: Buffer) {
                    string += chunk.toString();
                    return true;
                }
            })()
        );
        return string;
    }

    describe(configName, () => {
        test('empty', async function () {
            expect(await transform(``)).toMatchSnapshot();
        });

        test('with ANSI color codes', async function () {
            expect(
                await transform(`
[1;32mcommit f735de7025c6d626c5ae1a291fe24f143dea0313[m
Author: Shrey Banga <banga.shrey@gmail.com>
Date:   Sun Apr 11 15:25:34 2021 -0700

    Add theme support

[1;33mdiff --git a/todo.md b/todo.md[m
[1;33mindex 9f14e96..eaf3730 100644[m
[1;33m--- a/todo.md[m
[1;33m+++ b/todo.md[m
[1;32m@@ -7,6 +7,7 @@[m
 -   [x] Handle file addition/deletion properly[m
 -   [x] Fix incorrect line positions when a hunk has discontinuous inserts and/or deletes[m
 -   [x] Organize code[m
[1;32m+[m[1;32m-   [x] Move visual config to theme[m
 -   [ ] Handle empty diffs[m
 -   [ ] Handle moves and renames without diffs[m
 -   [ ] Highlight changes in lines[m

`)
            ).toMatchSnapshot();
        });

        test('commits without diffs', async function () {
            expect(
                await transform(`
commit e5f896655402f8cf2d947c528d45e1d56bbf5717 (HEAD -> main)
Author: Shrey Banga <banga.shrey@gmail.com>
Date:   Sun Apr 11 16:23:54 2021 -0700

    Small refactor to allow testing end-to-end

commit b637f38029f4a89c6a3b73b2b84a6a5b9e260730
Author: Shrey Banga <banga.shrey@gmail.com>
Date:   Sun Apr 11 11:53:02 2021 -0700

    Organize code

commit f323143e03af95fee5d38c21238a92ffd4461847
Author: Shrey Banga <banga.shrey@gmail.com>
Date:   Sun Apr 11 10:39:17 2021 -0700

    more todos
`)
            ).toMatchSnapshot();
        });

        test('commit with addition', async function () {
            expect(
                await transform(`
commit f735de7025c6d626c5ae1a291fe24f143dea0313
Author: Shrey Banga <banga.shrey@gmail.com>
Date:   Sun Apr 11 15:25:34 2021 -0700

    Add theme support

diff --git a/todo.md b/todo.md
index 9f14e96..eaf3730 100644
--- a/todo.md
+++ b/todo.md
@@ -9,2 +9,3 @@
 -   [x] Organize code
+-   [x] Move visual config to theme
 -   [ ] Handle empty diffs
`)
            ).toMatchSnapshot();
        });

        test('commit with deletion', async function () {
            expect(`commit eccfb5a2b3d76ba53df315f977da74b18d50113e
Author: Shrey Banga <shrey@quip.com>
Date:   Thu Aug 22 10:07:25 2019 -0700

    Remove deprecated option

diff --git a/Code/User/settings.json b/Code/User/settings.json
index a33d267..ae58a01 100644
--- a/Code/User/settings.json
+++ b/Code/User/settings.json
@@ -26,5 +26,4 @@
   // search
   "search.location": "panel",
-  "search.usePCRE2": true,

   // telemetry
`).toMatchSnapshot();
        });

        test('commit with a small diff', async function () {
            expect(