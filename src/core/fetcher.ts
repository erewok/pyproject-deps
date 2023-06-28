import { prerelease, rsort } from 'semver';
import { CompletionItem, CompletionItemKind, CompletionList } from "vscode";
import { getVersions } from "../api/pypi";
import { Dependency, Item, Version } from "../core/interfaces";
import { sortText } from "../providers/autoCompletion";
import { statusBarItem } from "../ui/indicators";

export async function fetchPackageVersions(
  dependencies: Item[],
  shouldListPreRels: boolean,
): Promise<[Dependency[], Map<string, Dependency[]>]> {
  statusBarItem.setText("👀 Fetching PyPi.org");
  const no_check = new Set(['python']);
  const responses = dependencies
    .filter((item: Item) => !no_check.has(item.key))
    .map(
    async (item: Item): Promise<Dependency> => {
      try {
        let py_versions = await getVersions(item.key);
        const unsorted_versions: string[] = py_versions.versions
          .reduce((result: any[], item: Version) => {
            const isPreRelease = !shouldListPreRels && prerelease(item.num, {loose: true}) !== null;
            if (!item.yanked && !isPreRelease)
              result.push(item.num);
            return result;
          }, [])
          const versions = rsort(unsorted_versions, {loose: true});
          let i = 0;
          const versionCompletionItems = new CompletionList(
            versions.map((version: string) => {
              const completionItem = new CompletionItem(
                version,
                CompletionItemKind.Class
              );
              completionItem.preselect = i === 0;
              completionItem.sortText = sortText(i++);
              return completionItem;
            }),
            true
          );

          let featureCompletionItems: Map<string, CompletionList> = new Map();
          py_versions.versions.forEach((item: any) => {
            if (item.extras && Array.isArray(item.extras) && item.extras.length > 0) {
              const isPreRelease = !shouldListPreRels && item.num.indexOf("-") !== -1;
              if (!item.yanked && !isPreRelease) {
                featureCompletionItems!.set(item.num, new CompletionList(item.extras.map((feature: string) => {
                  return new CompletionItem(feature, CompletionItemKind.Class);
                })));
              }
            }
          });

          return {
            item,
            versions,
            versionCompletionItems,
            featureCompletionItems,
            docs_url: py_versions.docs_url,
            latest_version: py_versions.latest_version,
            extras: py_versions.extras,
          };
      }
      catch (error) {
        console.error(error);
        return {
          item,
          docs_url: null,
          latest_version: null,
          extras: [],
          error: item.key + ": " + error,
        };
      }
    });
  let evaluated: Dependency[] = await Promise.all(responses);
  let responsesMap: Map<string, Dependency[]> = new Map();
  evaluated.forEach( (dep) => {
    const found = responsesMap.get(dep.item.key);
    if (found) {
      found.push(dep);
    } else {
      responsesMap.set(dep.item.key, [dep]);
    }
  });
  return [evaluated, responsesMap];
}
