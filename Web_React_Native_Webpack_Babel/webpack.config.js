const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
    devtool: 'eval-source-map',
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                babelrc: false,
                presets: ['env', 'react', 'es2015', 'stage-0']
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {}
                }
            ]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }, devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HWP(
            { template: path.join(__dirname, '/src/index.html') }
        )
    ]
}