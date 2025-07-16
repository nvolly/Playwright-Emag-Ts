module.exports = {
  default: {
    paths: ["tests/features/"],
    require: ["tests/step-definitions/*.ts"],
    requireModule: ["ts-node/register"],
    formatOptions: {
      snippetInterface: "async-await",
    },
  },
};
