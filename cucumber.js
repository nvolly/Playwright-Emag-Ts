module.exports = {
  default: {
    paths: ['tests/bdd/features/**/*.feature'],
    require: ['tests/bdd/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:reports/bdd/cucumber-report.html',
      'json:reports/bdd/cucumber-report.json',
    ],
    publishQuiet: true,
  },
};
