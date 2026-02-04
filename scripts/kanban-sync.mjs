#!/usr/bin/env node
/**
 * Minimal helper to print current PR/Issue status.
 * (Keeps it free + simple; no external services.)
 */
import { execa } from 'execa'

const repo = process.env.REPO || 'CassiusHR/tech-radar'

async function main() {
  const prs = await execa('gh', ['pr', 'list', '--repo', repo, '--limit', '20', '--json', 'number,title,state,url'], {
    timeout: 20000,
  })
  const issues = await execa(
    'gh',
    ['issue', 'list', '--repo', repo, '--limit', '20', '--json', 'number,title,state,url,labels'],
    { timeout: 20000 }
  )

  console.log('PRs:', prs.stdout)
  console.log('Issues:', issues.stdout)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
