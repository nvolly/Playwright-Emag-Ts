module.exports = {
  default: {
    paths: ["tests/features/**/*.feature"],
    require: ["step-definitions/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress"],
    publishQuiet: true,
  },
};
