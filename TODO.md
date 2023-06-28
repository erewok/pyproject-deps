## Get Basic Functionality Working

- Fix docs-url: should be at the top near versions list
- Fix Semver parsing for Python pre-release packages
- Keep prefix for version numbers such as "^" when autofilling new values.
- Evaluate memory usage and trim where we can.

## Supporting different version specs

- PEP 621 (hatch and others):
```
[project]
dependencies = [
  "httpx",
  "gidgethub[httpx]>4.0.0",
  "django>2.1; os_name != 'nt'",
  "django>2.0; os_name == 'nt'",
]

[project.optional-dependencies]
gui = ["PyQt5"]
cli = [
  "rich",
  "click",
]
```

- Poetry

## Supporting different mirrors, extra-index-urls, and private repos

See pip's `--extra-index-urls` and the [devpi project](https://pypi.org/project/devpi/).