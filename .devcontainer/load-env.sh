# Sourced from ~/.bashrc so gh sees GITHUB_TOKEN from .devcontainer/.env.
# Usage: . load-env.sh <path-to-.env>
# An empty value in .env must not hide a token from the host.

_devc_host_token=$GITHUB_TOKEN
if [ -f "$1" ]; then
	set -a
	. "$1" >/dev/null 2>&1
	set +a
fi
if [ -z "$GITHUB_TOKEN" ]; then
	GITHUB_TOKEN=$_devc_host_token
fi
if [ -n "$GITHUB_TOKEN" ]; then
	export GITHUB_TOKEN
fi
unset _devc_host_token
