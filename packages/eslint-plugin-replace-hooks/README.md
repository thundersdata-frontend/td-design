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
        "replace-hooks"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "replace-hooks/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


