let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .js('resources/assets/js/es6/main.js', 'public/build')
    .copy('node_modules/nouislider/distribute/nouislider.min.css', 'public/css')
    .js('resources/assets/js/es6/test2.js', 'public/build')
   .sass('resources/assets/sass/app.scss', 'public/css');
