const Koa = require('koa2');
const app = new Koa();
const serve = require('koa-static');
const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpackConfig = require('./config/webpack.config.dev');

const compiler = webpack(webpackConfig);
app.use(devMiddleware(compiler, {
  noInfo: false,
  quiet: false,
  stats: {
    colors: true
  }
}));
app.use(hotMiddleware(compiler));

app.use(serve(__dirname, '/static'));

app.listen(3001, () => {
  console.log('app listen at 3001 successful');
})