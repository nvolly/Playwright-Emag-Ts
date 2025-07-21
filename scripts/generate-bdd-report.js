const report = require('multiple-cucumber-html-reporter');
const { execSync } = require('child_process');

// Get git branch and commit info
const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const gitCommit = execSync('git rev-parse HEAD').toString().trim();

report.generate({
  jsonDir: 'reports/bdd',
  reportPath: 'reports/bdd/html',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '10'
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Playwright E2E Framework' },
      { label: 'Branch', value: gitBranch },
      { label: 'Commit', value: gitCommit },
      { label: 'Generated', value: new Date().toUTCString() }
    ]
  }
});
