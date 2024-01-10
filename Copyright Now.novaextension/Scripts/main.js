/**
 * @package Copyright Update
 * @copyright Copyright (c) 2024 Issio Solutions, Inc
 * @author Yorick Phoenix <yorick@issio.net>
 */

/*! copyright Copyright (c) 2024, Issio Solutions, Inc */

/*  Test Examples
    =============
    Copyright 2021
    Copyright 2021-2022
    Copyright (c) 2021
    copyright (c) 2021-2022
    Copyright 2024
    Copyright 2021-2024
    Copyright (c) 2024
    Copyright (c) 2021-2024
 */

/*eslint strict: "off" */
/*globals exports, nova, Range */

// Invoked by the "Update" command
nova.commands.register("copright-update.update",
    (editor) =>
    {
        const config = nova.workspace.config;
        const copySearch = `${config.get('copySearch').trim().toLowerCase()} `; // 'copyright ';
        const copySymbol = `${config.get('copyAbbr').trim()} `;                 // '(c)';
        const copyFormat = config.get('dateFormat') ?? 'XXXX-YYYY';

        let selectedText;
        let selectionRange = editor.selectedRange;

        // If there is a selection, then only update text within that

        if (selectionRange.start !== selectionRange.end)
        {
            selectedText = editor.selectedText;
        }
        else
        {
            // Else consider the first 1,000 characters

            const maxLen = editor.document.length;

            selectionRange = new Range(0, Math.min(1000, maxLen));

            selectedText = editor.getTextInRange(selectionRange);
        }

        const newYear = (new Date()).getFullYear().toString();

        selectedText = selectedText.toLowerCase();

        let pos = 0;

        const actions = [];

        while ((pos = selectedText.indexOf(copySearch, pos)) !== -1)
        {
            pos += copySearch.length;

            if (selectedText.substring(pos, pos + copySymbol.length) === copySymbol)
            {
                pos += copySymbol.length;
            }

            const yearsTxt = selectedText.substring(pos);

            const year = parseInt(yearsTxt.substring(0, 4), 10);

            if (Number.isInteger(year))
            {
                let start, replace, repLen;

                pos += 4;

                if (year.toString() === newYear)
                {
                    continue;
                }

                if (yearsTxt.substring(4, 5) === '-')
                {
                    if (yearsTxt.substring(5, 9) !== newYear)
                    {
                        start = pos + 1;
                        replace = newYear;
                        repLen = 4;
                    }
                }
                else
                if (copyFormat === 'YYYY')
                {
                    // Replace existing Year with new Year

                    start = pos - 4;
                    replace = newYear;
                    repLen = 4;
                }
                else
                {
                    // Add new year to make a date range

                    start = pos;
                    replace = '-' + newYear;
                    repLen = 0;
                }

                if (replace)
                {
                    start += selectionRange.start;

                    // We push onto the front of the array because we are going to need
                    // to apply the changes in reverse, otherwise all the offsets will change
                    // as we apply stuff

                    actions.unshift({start, replace, repLen});
                }
            }
        }

        if (actions.length > 0)
        {
            editor.edit((e) =>
                {
                    actions.forEach((a) =>
                        {
                            const {start, replace, repLen} = a;

                            e.replace(new Range(start, start + repLen), replace);
                        });
                });
        }
    });
