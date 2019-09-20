const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: './build/pmap.js',
		library: 'pmap',
		libraryTarget: 'var'
	},
	module: {
	  rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
    	    presets: ['@babel/preset-env']
      	}
    	}
    }]
  },
};
