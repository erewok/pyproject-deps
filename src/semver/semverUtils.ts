import { maxSatisfying, satisfies } from "semver";


export function checkVersion(version: string = "0.0.0", versions: string[], includePrerelease: boolean = false): [boolean, string | null] {
  let v = version;
  let prefix = v.charCodeAt(0);
  if (prefix > 47 && prefix < 58)
    v = "^" + v;
  const max = versions[0];
  return [satisfies(max, v, {loose: true}), maxSatisfying(versions, version, {loose: true, includePrerelease})];
}