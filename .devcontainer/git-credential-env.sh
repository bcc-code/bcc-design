#!/bin/sh
# Git credential helper that supplies GITHUB_TOKEN for HTTPS remotes.
# Reads .devcontainer/.env if present, otherwise uses GITHUB_TOKEN from the
# environment (containerEnv). Prints nothing when no token is available, so
# git falls back to its normal behaviour.

[ "$1" = "get" ] || exit 0

# Drain the request git sends on stdin
cat >/dev/null

host_token=$GITHUB_TOKEN
env_file="$(dirname "$0")/.env"
if [ -f "$env_file" ]; then
	# shellcheck disable=SC1090
	. "$env_file" >/dev/null 2>&1
fi
# An empty value in .env must not hide a token from the host
[ -n "$GITHUB_TOKEN" ] || GITHUB_TOKEN=$host_token

[ -n "$GITHUB_TOKEN" ] || exit 0

printf 'username=x-access-token\npassword=%s\n' "$GITHUB_TOKEN"
