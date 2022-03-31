module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-undef": 0, //不能有未定义的变量
    "no-unused-vars": 0, // 不能有声明后未被使用
  },
};
