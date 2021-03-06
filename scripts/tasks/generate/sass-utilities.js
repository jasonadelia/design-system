/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import path from 'path';

import _ from 'lodash';
import autoprefixer from 'autoprefixer';
import css from 'css';
import { diff } from 'deep-diff';
import gulp from 'gulp';
import minimist from 'minimist';
import postcss from 'gulp-postcss';
import sass from 'node-sass';
import through from 'through2';

import ignoreUnderscore from 'app_modules/util/ignore-underscore';

const argv = minimist(process.argv.slice(2));
const isDev = argv.dev === true;
const isProd = argv.prod === true;

function getIndexWithDependencies() { return path.resolve(path, __PATHS__.ui, 'utilities/index-with-dependencies.scss'); }

/**
 * Sass
 */
export default function (done) {
  console.log('Compiling Sass utilities');
  function handleError(err) {
    done(err);
  }
  gulp.src(getIndexWithDependencies())
  .pipe(ignoreUnderscore(getIndexWithDependencies()))
  // Sass
  .pipe(through.obj((file, enc, next) => {
    const newFile = file.clone();
    let contents = file.contents.toString();
    try {
      contents = sass.renderSync({
        data: contents,
        file: newFile.path,
        outputStyle: 'nested',
        sourceComments: true,
        includePaths: [
          __PATHS__.root,
          __PATHS__.node_modules,
          __PATHS__.ui
        ]
      }).css;
    } catch(error) {
      console.log('Error processing file: ' + error.message + ' (' + error.file + ':' + error.line + ':' + error.column + ')');
      return next(error);
    }
    newFile.contents = new Buffer(contents);
    newFile.path = newFile.path.replace('index-with-dependencies', 'utilities').replace(/\.scss$/, '.css');
    next(null, newFile);
  }))
  .on('error', handleError)
  // Autoprefixer
  .pipe(postcss([autoprefixer()]))
  .on('error', handleError)
  .pipe(gulp.dest(__PATHS__.generated))
  .on('error', handleError)
  .on('finish', done);
}
