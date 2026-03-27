const { exec } = require('node:child_process');
const { exit } = require('node:process');
const currentVersion = require('../package.json').version;

const increment = process.argv[2];
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

const command = `npm version ${
	channel === 'release' ? increment : `${update} --preid ${channel}`
} --no-git-tag-version`;

exec(command, (error, newVersion) => {
	if (error) {
		console.error(error);
		exit(1);
	}
	const tagVersion = newVersion.replace('\n', '').trim();
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
