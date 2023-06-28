# pyproject-deps

**THIS IS ALPHA SOFTWARE: USE AT YOUR OWN RISK**

This is **Python dependencies**, an extension for _pypi.org_ dependencies. It aims helping developers to manage dependencies when authoring or updating `pyproject.toml` files.

This library started as a **fork** by the **hugely useful**
[crates](https://github.com/serayuzgur/crates) by [serayuzgur](https://github.com/serayuzgur). This project owes credit to `crates` and would not exist without it.

## Notes

- It is only helpful if you are using dependencies from _pypi.org_.
- TOML must be valid. If not, pyproject-deps will not show versions. It will inform you with the status bar and dialog.

## Features

**pyproject-deps** is very simple. It has just two features.

- Displays the latest version of the package next to it
- Shows all versions (clickable) on the tooltip of the package hovered.

Aims to be fast and simple.

### Simple settings

It is so **simple** that you do not need any configuration, but if you insist...

`"pyproject-deps.errorDecorator`: The text to show when a dependency has errors. Default is `❗️❗️❗`.

`"pyproject-deps.compatibleDecorator`: The text template to show when a dependency is semver compatible. `${version}` will be replaced by the latest version info. Default is `✅`

`"pyproject-deps.incompatibleDecorator`: The text template to show when a dependency is not semver compatible. `${version}` will be replaced by the latest version info. Default is `❌ ${version}`

`"pyproject-deps.listPreReleases`: If true, pre-release versions will be listed in hover and at decoration. The default is false.

## Known Issues

## Thanks to

[serayuzgur](https://github.com/serayuzgur)
