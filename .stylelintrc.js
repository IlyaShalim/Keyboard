module.exports = {
    extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
    plugins: [
      "stylelint-scss",
      "stylelint-order",
      "stylelint-config-rational-order/plugin",
    ],
    rules: {
      "order/properties-order": [],
      "plugin/rational-order": [
        true,
        {
          "border-in-box-model": false,
          "empty-line-between-groups": false,
        },
      ],
      "selector-class-pattern": null,
      "keyframes-name-pattern": null,
    },
  };