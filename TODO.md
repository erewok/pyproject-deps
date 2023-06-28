## Get Basic Functionality Working


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