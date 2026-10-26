const { exec } = require('node:child_process');
const { readFileSync } = require('node:fs');
const { exit } = require('node:process');
const currentVersion = require('../package.json').version;

let increment = process.argv[2];
const channel = process.argv[3] ?? 'release';
const whatsNew = process.argv[4]?.trim();

if (!increment) {
	console.log('No version increment given! Exiting...');
	exit();
}

let update = `pre${increment}`;
if (currentVersion.includes(channel)) {
	update = 'prerelease';
}

const versionParts = /(\d+\.\d+\.\d+)-(.*)\.\d+/g.exec(currentVersion);

// If there is a prerelease tag in the name but the channel is for public release,
// just strip the prerelease tag from the name
if (versionParts && channel === 'release') {
	increment = versionParts[1];
}

const command = `pnpm version ${
	channel === 'release' ? increment : `${update} --preid ${channel}`
} --no-git-tag-version`;

exec(command, error => {
	if (error) {
		console.error(error);
		exit(1);
	}
	// pnpm doesn't print the bare version, so read it back from package.json
	const tagVersion = `v${JSON.parse(readFileSync(`${__dirname}/../package.json`, 'utf8')).version}`;
	const tagName = `component-library-${tagVersion}`;
	const tagMessage = whatsNew ? `component-library ${tagVersion}\n\n${whatsNew}` : `component-library ${tagVersion}`;
	exec(
		`git add . && git commit -m "component-library ${tagVersion}" && git tag -am ${JSON.stringify(
			tagMessage
		)} "${tagName}"`,
		err => {
			if (err) {
				console.error(err);
				exit(1);
			}
			console.log(`Tagged new version component-library-${tagVersion}`);
		}
	);
});
