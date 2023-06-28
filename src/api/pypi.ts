// PyPi.org JSON API
// https://pypi.org/pypi/sampleproject/json -H "Accept: application/json"

/**
 * Holds important api calls for PyPi.org
 */
import axios, { AxiosRequestConfig, AxiosRequestHeaders, ResponseType } from 'axios';
import { rcompare, valid } from 'semver';
import { Version, Versions } from "../core/interfaces";

const Cache: any = {};

interface PyPiResponse {
	info: PyPiInfoBlock;
    releases: {
        [semver: string]: { // there are other keys we're not using
            yanked: boolean
        }[],
    }
}

interface PyPiInfoBlock {
    docs_url: string | null,
    name: string,
    project_url: string | null,
    version: string,  // latest version
    yanked: boolean,
}


export async function getVersions(projectName: string): Promise<Versions> {
  if (!Cache[projectName] || !Array.isArray(Cache[projectName].versions) || Cache[projectName].versions.length == 0) {
    console.log("Fetching dependency: ", projectName);
    let versions = requestBuilder(projectName)
        .then((response) => {
            console.log("Fetching DONE: ", projectName);
            if (response === null) {
                return { versions: [] };
            } else {
                return mungeVersions(response);
            }
        });
    Cache[projectName] = versions;
  }
  return Cache[projectName];
}

async function requestBuilder(projectName: string): Promise<null | PyPiResponse> {
    const url = `https://pypi.org/pypi/${projectName}/json`;
    const headers: AxiosRequestHeaders = {
        'User-Agent': 'VSCode.Pyproject-Deps (https://marketplace.visualstudio.com/items?itemName=erewok.pyproject-deps)',
        'Accept': 'application/json',
    } as AxiosRequestHeaders;
    const requestConfig: AxiosRequestConfig<PyPiResponse> = {
        url,
        headers,
        method: "GET",
        responseType: "json" as ResponseType
    };
    try {
        let response = await axios.get(url, requestConfig);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export function mungeVersions(response: PyPiResponse): Versions {
    let versions: Version[] = [];
    for (const semver in response.releases) {
        if (valid(semver, {loose: true}) !== null) {
            let anyYanked = response.releases[semver].reduce((hasBeenYanked: boolean, rel: {yanked: boolean}) => {
                return hasBeenYanked || rel.yanked;
          }, false);
            let version = {
                num: semver,
                yanked: anyYanked
            };
            versions.push(version);
        }
    }
    let version_sorted = versions.sort((item1, item2) => rcompare(item1.num, item2.num, {loose: true}));
    return {
        docs_url: response.info.docs_url ?? response.info.project_url,
        extras: [],
        latest_version: response.info.version,
        versions: version_sorted
    };
}