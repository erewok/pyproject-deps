# pyproject-deps

**THIS IS ALPHA SOFTWARE: USE AT YOUR OWN RISK**

**Pyproject Dependencies** has been built as a VSCode extension for discovering the latest versions of dependencies listed in a `pyproject.toml` file. It uses _pypi.org_ to find published versions of packages, with the goal of helping developers to manage dependencies when authoring or updating `pyproject.toml` files.

**Currently, this library only supports dependencies formatted according to the `poetry` project**, as in the following example:

```toml
[tool.poetry.dependencies]
python = "^3.11"
azure-eventhub = "5.11.2"
hiredis = "^2.1.1"
httpx = "0.24.1"
orjson = "^3.8.3"
mysqlclient = { version = "^1.3", optional = true }
psycopg2 = { version = "^2.7", optional = true }
```

There are other **known limitations** listed below.

## Prior work

This library started as a **fork** of the **hugely useful**
[crates](https://github.com/serayuzgur/crates) by [serayuzgur](https://github.com/serayuzgur). In short, this project owes credit to `crates` and would not exist without it.

## Notes

- This project is only helpful if you are using dependencies from _pypi.org_.
- TOML must be valid. If not, pyproject-deps will not show versions. It will inform you with the status bar and dialog.

## Features

**pyproject-deps** is very simple. It has just two features.

- Displays the latest version of the package next to it
- Shows all versions (clickable) on the tooltip of the package hovered.

### Simple settings

Following are the available configuration options for this extension:

`"pyproject-deps.listPreReleases`: If true, pre-release versions will be listed in hover and at decoration. The default is false.

`"pyproject-deps.errorDecorator`: The text to show when a dependency has errors. Default is `❗️❗️❗`.

`"pyproject-deps.compatibleDecorator`: The text template to show when a dependency is semver compatible. `${version}` will be replaced by the latest version info. Default is `✅`

`"pyproject-deps.incompatibleDecorator`: The text template to show when a dependency is not semver compatible. `${version}` will be replaced by the latest version info. Default is `❌ ${version}`

## How to Use

Because this is an alpha project it has not been uploaded the VSCode Extension Marketplace. If you still want to use it, you can do the following:

1. Clone this repo and `cd pyproject-deps`
2. Install `vsce` with npm: `npm install -g @vscode/vsce`
3. Run `vsce package`
4. Install in your local VSCode: `code --install-extension pyproject-deps-0.1.0-alpha.0.vsix`

## Known Issues

- Pypi.org only (no extra index URLs checked)
- Dependencies formatted in `poetry` style only
- Allowed Python Semver values such as `"^0.37b0"` are currently marked _invalid_

## Future Work

- Allow extra index URLs (including private package repos)
- Allow [PEP 508](https://packaging.python.org/en/latest/specifications/declaring-project-metadata/#declaring-project-metadata)-valid package versions
- Parse [PEP 621]()-style dependencies

Example of PEPs 508 and 621 dependencies:

```toml
dependencies = [
  "httpx",
  "gidgethub[httpx]>4.0.0",
  "django>2.1; os_name != 'nt'",
  "django>2.0; os_name == 'nt'"
]

[project.optional-dependencies]
test = [
  "pytest < 5.0.0",
  "pytest-cov[all]"
]
```


## Thanks to

[serayuzgur](https://github.com/serayuzgur)
