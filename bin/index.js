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
        let configPath = path || './.pow'
        let copyFlags = options.overwrite ? '-Rf' : '-R'
        sh.cp(`${copyFlags}`, '../config/', `./${configPath}/`)
        sh.exec(`openssl genrsa -out ${configPath}/private.pem 2048`)
        sh.exec(`openssl rsa -in ${configPath}/private.pem -pubout > public.pem`)
    })
program.parse(process.argv)