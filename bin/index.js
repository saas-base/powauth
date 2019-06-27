#!/usr/bin/env node

const pckg = require('./../package.json')
const program = require('commander')
const sh = require('shelljs')

program
    .version(pckg.version)


program
    .command('setup <path>')
    .option('-o, --overwrite', 'Overwrite config files.')
    .description('Setup and bootstrap powauth.')
    .action((path, options) => {
        let path = path || './.pow'
        let copyFlags = options.overwrite ? '-Rf' : '-R'
        sh.cp(`${copyFlags}`, '../config/', `./${path}/`)
        sh.exec(`openssl genrsa -out ${path}/private.pem 2048`)
        sh.exec(`openssl rsa -in ${path}/private.pem -pubout > public.pem`)
    })
program.parse(process.argv)