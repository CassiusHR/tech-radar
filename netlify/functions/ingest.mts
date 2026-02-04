import { runIngest } from '../../src/lib/ingest/run'

export const config = {
  schedule: '0 * * * *',
}

const handler = async () => {
  const res = await runIngest({ dryRun: false })
  return {
    statusCode: res.ok ? 200 : 500,
    body: JSON.stringify(res, null, 2),
    headers: { 'content-type': 'application/json' },
  }
}

export default handler
