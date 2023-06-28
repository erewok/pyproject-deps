import { TextEditor, workspace } from "vscode";


export interface Preferences {
    compatibleDecorator: string,
    incompatibleDecorator: string,
    errorDecorator: string,
    shouldListPreRels: boolean,
}

export function loadPref(editor: TextEditor): Preferences {
    const config = workspace.getConfiguration("", editor.document.uri);
    const compatibleDecorator = config.get<string>("pyproject-deps.compatibleDecorator") ?? "";
    const incompatibleDecorator = config.get<string>("pyproject-deps.incompatibleDecorator") ?? "";
    const errorText = config.get<string>("pyproject-deps.errorDecorator");
    const errorDecorator = errorText ? errorText + "" : "";
    const shouldListPreRels = config.get<boolean>("pyproject-deps.listPreReleases") ?? false;
    return {
      compatibleDecorator,
      incompatibleDecorator,
      errorDecorator,
      shouldListPreRels
    };
  }