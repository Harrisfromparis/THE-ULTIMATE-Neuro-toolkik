#!/usr/bin/env node
/**
 * CI-aware prebuild script.
 * - On local dev: run full link check (can fail) to keep data healthy.
 * - On CI/Netlify: run fast link check and do NOT fail the build (best-effort report).
 */

const { spawnSync } = require('node:child_process');

const isCI = Boolean(process.env.CI) || Boolean(process.env.NETLIFY);

function run(cmd, args, opts = {}) {
  const proc = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...opts });
  return proc.status ?? proc.signal ?? 0;
}

if (isCI) {
  // Fast, best-effort: don’t fail the build
  const code = run('node', ['tools/check-links.js', '--fast', '--no-fail']);
  process.exit(0);
} else {
  // Local development: allow failures to surface
  const code = run('node', ['tools/check-links.js']);
  process.exit(code);
}
