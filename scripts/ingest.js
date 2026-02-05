#!/usr/bin/env node
/* eslint-disable no-console */

// CommonJS runner for the compiled ingest code under dist/
// This avoids ESM extension/path-alias issues when executing in Node.

const { runIngest } = require('../dist/scripts/ingest-runner.js');

const dryRun = process.argv.includes('--dry');

(async () => {
  const res = await runIngest({ dryRun });
  console.log(JSON.stringify(res, null, 2));
  if (!res.ok) process.exit(1);
})();
