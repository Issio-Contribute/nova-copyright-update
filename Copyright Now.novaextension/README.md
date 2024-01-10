**Copyright Update** provides an easy way to update the copyright statements in your files to include the current year.

## Formats

You can configure the string format that will be searched for in the global or per-project settings.

By default the following formats will be checked:

1. Copyright YYYY
2. Copyright XXXX-YYYY
3. Copyright (c) YYYY
4. Copyright (c) XXXX-YYYY

When matching a single year (formats 1 and 3 above) you have the option of replacing the year or turning it into a range of years.

You can configure the strings that are matched. See Configuration below.

## Usage

To run Copyright Update:

- Select the **Editor → Copyright Update** menu item; or
- Open the command palette and type `Copyright Update`; or
- Use the Hot-Key / Shortcut: Cmd-Shift-U

If text is selected in the editor window, only copyright statements in the selection will be updated.
Otherwise the first 1,000 characters in the file will be checked.

## Configuration

To configure global preferences, open **Extensions → Extension Library...** then select Copyright Updates's **Preferences** tab.

You can also configure preferences on a per-project basis in **Project → Project Settings...**
