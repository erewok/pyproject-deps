import { expect } from 'chai';
import semver from 'semver';

const pythonSemvers = [
    "5.11.2",
    "^0.22.0",
    "^0.0.20",
    "0.1",
    "2.8.*",
    "<9",
    ">=7, <9, != 8.0.0",
    "2022.6.26",
    "2022.6",
    "1.2.post3",
    "1.2a3.post4",
    "1.2b3.post4",
    "1.2rc3.post4"
]

const pythonPreReleaseSemvers = [
    "2.0.0.dev0",
    "0.13.0.dev1",
    "0.26.0.post1",
    "^0.37b0",
    "1.2rc3",
    "1.2.dev3",
    "1.2a3.dev4",
    "1.2b3.dev4",
    "1.2rc3.dev4",
    "1.2.post3.dev4"
]

const repoPath = 'https://github.com/DonJayamanne/test_gitHistory.git';
describe('Branches', () => {
    pythonSemvers.forEach((val) => expect(semver.valid(val).to.be.not(null)))
})