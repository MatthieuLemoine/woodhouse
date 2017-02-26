#!/usr/bin/env node
const glob = require('glob');
const fs   = require('fs');
const sh   = require('shelljs');
const SRC_DIR  = 'src';
const DEST_DIR = 'build';

glob(`${SRC_DIR}/**/*(*.json|!(*.js))`, (err, files) => {
  if (err) {
    throw err;
  }
  const srcDirectories  = files.filter(file => fs.lstatSync(file).isDirectory());
  const destDirectories = srcDirectories.map(directory => directory.replace(SRC_DIR, DEST_DIR));
  const srcFiles        = files.filter(file => fs.lstatSync(file).isFile());
  const destFiles       = srcFiles.map(file => file.replace(SRC_DIR, DEST_DIR));
  // Create missing directories
  sh.mkdir('-p', destDirectories);
  // Copy files
  destFiles.forEach((file, index) => {
    const srcFile = srcFiles[index];
    process.stdout.write(`${srcFile} -> ${file}\n`);
    sh.cp(srcFiles[index], file);
  });
});
