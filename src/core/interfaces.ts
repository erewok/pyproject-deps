import { CompletionList } from "vscode";

/**
 * Dependency is a data structure to define parsed dependency index, versions and error
 */
export interface Dependency {
  item: Item;
  versions?: Array<string>;
  error?: string;
  docs_url: string | null,
  latest_version: string | null,
  extras: string[],
  versionCompletionItems?: CompletionList;
  featureCompletionItems?: Map<string, CompletionList>;
}

/**
 * Item is a data structure to define parsed items, hierarchy and index.
 */
export class Item {
  key: string = "";
  values: Array<any> = [];
  value: string | undefined = "";
  start: number = -1;
  end: number = -1;
  constructor(item?: Item) {
    if (item) {
      this.key = item.key;
      this.values = item.values;
      this.value = item.value;
      this.start = item.start;
      this.end = item.end;
    }
  }
}


export interface Versions {
  docs_url: string | null,
  latest_version: string,
  extras: string[],
  versions: Version[]
}

export interface Version {
  num: string,
  yanked: boolean
}
