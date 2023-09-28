const { exec } = require("node:child_process");
const { exit } = require("node:process");
const currentVersion = require("../package.json").version;

let increment = process.argv[2];
let channel = process.argv[3] ?? "release";

if (!increment) {
  console.log("No version increment given! Exiting...");
  exit();
}

let update = `pre${increment}`;
if (currentVersion.includes(channel)) {
  update = "prerelease";
}

const versionParts = /(\d+\.\d+\.\d+)-(.*)\.\d+/g.exec(currentVersion);

// If there is a prerelease tag in the name but the channel is for public release,
// just strip the prerelease tag from the name
if (versionParts && channel == "release") {
  increment = versionParts[1];
}

const command = `npm version ${
  channel == "release" ? increment : `${update} --preid ${channel}`
} --no-git-tag-version`;

// Version main package
exec(command, (error, newVersion) => {
  // Version Vue package
  exec(
    command,
    {
      cwd: `${process.cwd()}/vue`,
    },
    () => {
      const tagVersion = newVersion.replace("\n", "");
      exec(
        `git add . && git commit -m "icons ${tagVersion}" && git tag -am icons-${tagVersion} "icons-${tagVersion}"`
      );

      console.log(`Tagged new version ${tagVersion}`)
    }
  );
});
