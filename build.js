import webpack from 'webpack';
import webpackConfig from './webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log('webpack bundling started...');

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err);
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.error(error));
  }
  if (jsonStats.hasWarnings) {
    console.log('webpack warnings:');
    jsonStats.warnings.map(warn => console.log(warn));
  }
  console.log(`webpack stats: ${stats}`);
  console.log('compiled and written to /dist');
  return 0;
});
