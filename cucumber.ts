const config = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["tests/step-definitions/**/*.steps.ts"],
    paths: ["tests/features/**/*.feature"],
    format: ["json:cucumber-report.json", "progress-bar", "summary"],
    publishQuiet: true,
  },
};

export default config;
