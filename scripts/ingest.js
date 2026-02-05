#!/usr/bin/env node
/* eslint-disable no-console */

// Runner for the compiled ingest code under dist/
// Supports:
//   --dry    : do not write files
//   --force  : bypass schedule gate

const dryRun = process.argv.includes('--dry');
const force = process.argv.includes('--force');

const mod = await import('../dist/scripts/ingest-runner.js');
const { runIngest } = mod;

const res = await runIngest({ dryRun, force });
console.log(JSON.stringify(res, null, 2));
if (!res.ok) process.exit(1);
