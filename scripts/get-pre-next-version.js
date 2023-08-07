#! /usr/bin/env node

const conventionalRecommendedBump = require('conventional-recommended-bump');
const semver = require('semver');
const snPackage = require('../package.json');

conventionalRecommendedBump({ preset: 'angular' }, (error, recommendation) => {
  const next = semver.inc(snPackage.version, recommendation.releaseType);
  const preNext = next + '-pre';
  console.log(preNext);
});