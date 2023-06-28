import { expect } from 'chai';
import semver from 'semver';

const pythonSemvers = [
    "5.11.2",
    "^0.22.0",
    "^0.0.20",
    "0.1",
]

const pythonPreReleaseSemvers = [
    "2.0.0.dev0",
    "0.13.0.dev1",
    "0.26.0.post1"
]

const repoPath = 'https://github.com/DonJayamanne/test_gitHistory.git';
describe('Branches', () => {
    pythonSemvers.forEach((val) => expect(semver.valid(val).to.be.not(null)))
})