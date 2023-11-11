const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const TerserPlugin = require("terser-webpack-plugin");

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    //	https://webpack.js.org/configuration/mode/
    mode: 'development',
    entry: {
        index: "./src/js/index.js",
        lightbox: "./src/js/lightbox.js"
    },
    output: {
        //		filename: "[name].bundle.js",
        filename: "[name].bundle.js",
        //		path: path.resolve(__dirname, "public") Can change directory name
        path: path.resolve(__dirname, "public"),
        // For the images to be loaded in the browser
        assetModuleFilename: 'assets/resource/[hash][ext][query]'
    },
    target: "web",
    devServer: {
        hot: true,
        watchFiles: ['src/'],
        open: {
            app: 'Google Chrome'
        },
        static: {
            directory: path.join(__dirname, 'public'),
            watch: true,
        },
        port: 9004
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    plugins: [
        // Main Page
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html-templates/index-template.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'theming.html',
            template: './src/html-templates/theming-template.html'
        }),
        // Favicon
        new FaviconsWebpackPlugin({
            logo: './src/images/B5P-Color@4x.png'
        })
    ],
    module: {
        rules: [{
            // Whenever a javascript file is found, babel should run and do not compile node_module files
            test: /\js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS Strings
                { loader: 'style-loader' },

                // Translates CSS into CommonJS
                { loader: 'css-loader' },

                // Compiles Sass to CSS
                {
                    loader: 'sass-loader',
                    options: {
                        implementation: require('sass')
                    }
                },
            ]
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            type: 'asset/resource',
        }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    }
};
