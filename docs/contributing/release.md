# Release new version
To release a new version of `@bcc-code/vue-components`, first create a Git tag and update the `package.json`. The easiest way is to use `npm version`:
```ssh
npm version 0.1.0
```

Then push this tag to GitHub:
```ssh
git push --follow-tags
```

This will automatically create a [new release](https://github.com/bcc-code/bcc-vue-components/releases) in GitHub. Publish this release and the package will automatically be published to npm.
