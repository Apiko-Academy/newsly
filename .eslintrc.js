module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "new-cap": "off",
      "no-underscore-dangle": "off",
      "quotes": "off",
      "no-console": "off",
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/forbid-prop-types": "off",
    },
    "globals": {
      "window": true,
      "document": true,
    }
};
