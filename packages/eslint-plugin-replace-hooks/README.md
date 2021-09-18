# eslint-plugin-replace-hooks

replace some hooks by other hooks

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-replace-hooks`:

```sh
npm install eslint-plugin-replace-hooks --save-dev
```

## Usage

Add `replace-hooks` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "replace-hooks" // this must be placed before `import`
  ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "replace-hooks/no-forbidden-hooks": [
      "error",
      { "useState": { "tip": "your custom hooks", "dependency": "your module" } }
    ]
  }
}
```

## Supported Rules

- no-forbidden-hooks

## Caution

- this plugin should work with `eslint-plugin-import`, especially the rules `import/no-duplicates` to help merge import from same modules.
- the plugin must be placed before `eslint-plugin-import`

  plugins: [ // other plugins, 'replace-hooks', 'import', ]
