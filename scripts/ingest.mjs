#!/usr/bin/env node
import { runIngest } from '../dist/ingest-runner.mjs'

const dryRun = process.argv.includes('--dry')
const res = await runIngest({ dryRun })
console.log(JSON.stringify(res, null, 2))
if (!res.ok) process.exit(1)
