#!/usr/bin/env node
/* eslint-disable no-console */

// ESM runner for the compiled ingest code under dist/
// Using dynamic import avoids CJS require() lint restrictions.

const dryRun = process.argv.includes('--dry');

const mod = await import('../dist/scripts/ingest-runner.js');
const { runIngest } = mod;

const res = await runIngest({ dryRun });
console.log(JSON.stringify(res, null, 2));
if (!res.ok) process.exit(1);
