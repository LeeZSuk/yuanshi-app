const { override, addWebpackModuleRule, addWebpackAlias } = require('customize-cra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
// 判断当前环境：开发环境使用 style-loader，生产环境使用 MiniCssExtractPlugin
const isEnvDevelopment = process.env.NODE_ENV === 'development';

const styleLoader = isEnvDevelopment
  ? 'style-loader'
  : MiniCssExtractPlugin.loader;

module.exports = override(
  // 完全覆盖所有 .less 文件的规则
  addWebpackModuleRule({
    test: /\.less$/,
    use: [
      styleLoader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 3, // 需要经过的后续 loader 数量：postcss、resolve-url、less
          sourceMap: true,
          modules: {
            auto: true, // 自动根据文件名是否为 .module.less 启用 CSS Modules
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [require('autoprefixer')], // 在此添加你需要的 postcss 插件
          },
          sourceMap: true,
        },
      },
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              // 你的主题变量
            },
          },
          sourceMap: true,
        },
      },
    ],
  }),

  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),

);