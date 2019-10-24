#!/usr/bin/env node

var fillZero = require('../lib').default.string.fillZero;
var pathTest = require('../lib').default.string.pathTest;

console.log(fillZero(9), fillZero(10));
console.log('pathTest', pathTest());
