# nebula.js list visualizations

- [sn-filter-pane](./packages/sn-filter-pane/README.md)
- sn-listbox

## Releasing

Simply run the [create-release](https://github.com/qlik-oss/sn-list-objects/actions/workflows/create-release.yaml) workflow. Both sn-listbox and sn-filterpane will be bumped and released.

It requires a branch to deploy as a parameter, this should *always* be `main`.

For pre-releases, choose what kind of pre-relsease in dropdown.

If dry-run is checked, packages will not be released.
Dry-run is to show interactivity and the commands it *would* execute.
Note that read-only commands are still executed (commands prefixed with $ ), while potentially writing/mutating commands are not (commands prefixed with ! )

```bash
$ git rev-parse --git-dir
.git
! git add package.json
! git commit --message="Release 0.8.3"
```

You need to be a collaborator to run this workflow.
