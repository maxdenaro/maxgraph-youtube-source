import gulp from 'gulp';
const { src, dest, series, watch } = gulp;

// Import Modules
import autoPrefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import {deleteAsync} from 'del';

import { create as browserSyncCreate } from 'browser-sync';
const browserSync = browserSyncCreate();

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import webp from 'gulp-webp';
import cheerio from 'gulp-cheerio';

import replace from 'gulp-replace';
import fileinclude from 'gulp-file-include';

import rev from 'gulp-rev';
import revRewrite from 'gulp-rev-rewrite';
import revdel from 'gulp-rev-delete-original';

import htmlmin from 'gulp-htmlmin';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import zipListener from 'gulp-zip';

import webpack from 'webpack';
import webpackStream from 'webpack-stream';

// need some chek on compability
// import { readFileSync } from 'node:fs'; // check correction
import { readFileSync } from 'fs';
// import path from 'node:path'; // example 1
import path from 'path'; // example 2
const rootFolder = path.basename(path.resolve());

// SRC & APP path folders
const srcFolder = './src';
const buildFolder = './app';

// src inner path folders
const srcPaths = {
  srcAssetsFolder: `${srcFolder}/resources`,
  srcHtmlFolder: `${srcFolder}/partials`,
  srcImagesFolder: `${srcFolder}/img`,
  srcSvgSpritesFolder: `${srcFolder}/img/svg/**.svg`,
  srcMainJsFileFolder: `${srcFolder}/js/main.js`,
  srcFullJsFolder: `${srcFolder}/js/**/*.js`,
  srcScssFolder: `${srcFolder}/scss/**/*.scss`,
};

// app inner path folders
const appPaths = {
  buildAssetsFolder: `${buildFolder}/assets`,
  buildImagesFolder: `${buildFolder}/img/`,
  buildJsFolder: `${buildFolder}/js`,
  buildCssFolder: `${buildFolder}/css`,
};

// check if gulp in production mode
let isProd = false; // by default gulp is in dev mode

// clean app folder after restarting gulp
const clean = () => {
  return deleteAsync([buildFolder])
}

///// ----- Styles Functins ----- /////

// scss styles function
const styles = () => {
  return src(srcPaths.srcScssFolder, { sourcemaps: !isProd })
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(sass())
    .pipe(autoPrefixer({
      cascade: false,
      grid: true,
      // overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(gulpif(isProd, cleanCSS({
      level: 2
    })))
    .pipe(dest(appPaths.buildCssFolder, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}

// scss styles function for backend
const stylesBackend = () => {
  return src(srcPaths.srcScssFolder)
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(sass())
    .pipe(autoPrefixer({
      cascade: false,
      grid: true,
      // overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(dest(appPaths.buildCssFolder))
    .pipe(browserSync.stream());
}

///// ----- Scripts Functins ----- /////

// scripts function
const scripts = () => {
  return src(srcPaths.srcMainJsFileFolder)
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: isProd ? 'production' : 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
      devtool: !isProd ? 'source-map' : false
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(dest(appPaths.buildJsFolder))
    .pipe(browserSync.stream());
}

// scripts for backend function
const scriptsBackend = () => {
  return src(srcPaths.srcMainJsFileFolder)
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
      devtool: false
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(dest(appPaths.buildJsFolder))
    .pipe(browserSync.stream());
}

///// ----- HTML Functins ----- /////

// html include function
const htmlInclude = () => {
  return src([`${srcFolder}/*.html`])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest(buildFolder))
    .pipe(browserSync.stream());
}

// minify html function
const htmlMinify = () => {
  return src(`${buildFolder}/**/*.html`)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest(buildFolder));
}

///// ----- Assets Functins ----- /////
const assets = () => {
  return src(`${srcPaths.srcAssetsFolder}/**`)
    .pipe(dest(buildFolder))
}

///// ----- Images Functins ----- /////

// image function
const images = () => {
  return src([`${srcPaths.srcImagesFolder}/**/**.{jpg,jpeg,png,svg}`])
    .pipe(gulpif(isProd, imagemin([
      mozjpeg({
        quality: 80,
        progressive: true
      }),
      optipng({
        optimizationLevel: 2
      }),
    ])))
    .pipe(dest(appPaths.buildImagesFolder))
};

// webp images function
const webpImages = () => {
  return src([`${srcPaths.srcImagesFolder}/**/**.{jpg,jpeg,png}`])
    .pipe(webp())
    .pipe(dest(appPaths.buildImagesFolder))
};

// svg sprites function
const svgSprites = () => {
  return src(srcPaths.srcSvgSpritesFolder)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest(appPaths.buildImagesFolder));
}

///// ----- Watch  Files Functin ----- /////
const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: `${buildFolder}`
    },
  });

  watch(srcPaths.srcScssFolder, styles);
  watch(srcPaths.srcFullJsFolder, scripts);
  watch(`${srcPaths.srcHtmlFolder}/*.html`, htmlInclude);
  watch(`${srcFolder}/*.html`, htmlInclude);
  watch(`${srcPaths.srcAssetsFolder}/**`, assets);
  watch(srcPaths.srcSvgSpritesFolder, svgSprites);
  watch(`${srcPaths.srcImagesFolder}/**/**.{jpg,jpeg,png,svg}`, images);
  watch(`${srcPaths.srcImagesFolder}/**/**.{jpg,jpeg,png}`, webpImages);
}


///// ----- Cashe Files Functins ----- /////
const cacheFiles = () => {
  return src(`${buildFolder}/**/*.{css,js,woff2,svg,png,jpg,jpeg,webp}`, {
    base: buildFolder
  }) // maybe need fix tabs
    .pipe(rev())
    .pipe(revdel())
    .pipe(dest(buildFolder))
    .pipe(rev.manifest('rev.json'))
    .pipe(dest(buildFolder))
};

///// ----- Revrite Files Functins ----- /////
const revrite = () => {
  const manifest = readFileSync('app/rev.json');
  src(`${appPaths.buildCssFolder}/*.css`)
    .pipe(revRewrite({
      manifest
    }))
    .pipe(dest(appPaths.buildCssFolder));
  return src(`${buildFolder}/**/*.html`)
    .pipe(revRewrite({
      manifest
    }))
    .pipe(dest(buildFolder));
}

///// ----- Zip Files Functins ----- /////
const zipFiles = (done) => {
  deleteAsync.sync([`${buildFolder}/*.zip`]);
  return src(`${buildFolder}/**/*.*`, {})
    .pipe(plumber(
      notify.onError({
        title: "ZIP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(zipListener(`${rootFolder}.zip`))
    .pipe(dest(buildFolder))
};

///// ----- gulp in production mode ----- //////
const toProd = (done) => {
  isProd = true;
  done();
};

// default mode
export default series(clean, htmlInclude, scripts, styles, assets, images, webpImages, svgSprites, watchFiles);

// backend mode
export const backend = series(clean, htmlInclude, scriptsBackend, stylesBackend, assets, images, webpImages, svgSprites);

// build  mode
export const build = series(toProd, clean, htmlInclude, scripts, styles, assets, images, webpImages, svgSprites, htmlMinify);

// cache mode
export const cache = series(cacheFiles, revrite);

// zip files gulp command
export const zip = zipFiles;