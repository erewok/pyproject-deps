/**
 * Listener for TOML files.
 * Filters active editor files according to the extension.
 */
import { Position, Range, TextDocument, TextEditor, workspace } from "vscode";
import { status } from "../toml/commands";
import { filterPackages, parse } from "../toml/parser";
import decorate, { decorationHandle } from "../ui/decorator";
import { statusBarItem } from "../ui/indicators";
import { fetchPackageVersions } from "./fetcher";
import { Dependency, Item } from "./interfaces";

function parseToml(text: string): Item[] {
  console.log("Parsing...");
  const toml = parse(text);
  const tomlDependencies = filterPackages(toml.values);
  console.log("Parsed");
  statusBarItem.setText("pyproject.toml parsed");
  return tomlDependencies;
}

var dependencies: Item[];
var fetchedDeps: Dependency[];
var fetchedDepsMap: Map<string, Dependency[]>;
export { dependencies, fetchedDeps, fetchedDepsMap };

export function getFetchedDependency(document: TextDocument, pypackage: string, position: Position): Dependency | undefined {
  const fetchedDep = fetchedDepsMap.get(pypackage);
  if (!fetchedDep) return;
  if (fetchedDep.length === 1) {
    return fetchedDep[0];
  } else {
    for (let i = 0; i < fetchedDeps.length; i++) {
      const range = new Range(
        document.positionAt(fetchedDeps[i].item.start + 1),
        document.positionAt(fetchedDeps[i].item.end - 1)
      );
      if (range.contains(position)) {
        return fetchedDeps[i];
      }
    }
  }
}

export async function parseAndDecorate(
  editor: TextEditor,
  wasSaved: boolean = false,
  fetchDeps: boolean = true
) {
  const text = editor.document.getText();
  const config = workspace.getConfiguration("", editor.document.uri);
  const shouldListPreRels = config.get("pyproject-deps.listPreReleases");

  try {
    // Parse
    dependencies = parseToml(text);
    if (fetchDeps || !fetchedDeps || !fetchedDepsMap) {
      const versionFetchResult: [Dependency[], Map<string, Dependency[]>] = await fetchPackageVersions(
        dependencies,
        !!shouldListPreRels,
      );
      fetchedDeps = versionFetchResult[0];
      fetchedDepsMap = versionFetchResult[1];
    }

    decorate(editor, fetchedDeps);

  } catch (e) {
    console.error(e);
    statusBarItem.setText("pyproject.toml is not valid!");
    if (decorationHandle) {
      decorationHandle.dispose();
    }
  }
}

export default async function listener(editor: TextEditor | undefined): Promise<void> {
  if (editor) {
    const { fileName } = editor.document;
    if (fileName.toLocaleLowerCase().endsWith("pyproject.toml")) {
      status.inProgress = true;
      status.replaceItems = [];
      statusBarItem.show();
      await parseAndDecorate(editor);
    } else {
      statusBarItem.hide();
    }
    status.inProgress = false;
  } else {
    console.log("No active editor found.");
  }
  return Promise.resolve();
}
