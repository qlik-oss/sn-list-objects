# Rendering tests

Run rendering tests with

```sh
yarn test:rendering
```

Rendering test compares a baseline snapshot with a current version of the same object. The original output is then under `baselines`. If you run the test locally the baselines will end up under `baselines-local`. If you want/need to update the baselines you should do the following:

1. Open run in your commit
2. Open the artifact index.html in the rendering_output zip
3. Take the "actual.png" and download locally and replace the original in `baselines`
4. Commit and push
5. Make sure it goes green

There is also an easier way of updating the snapshots. You can trigger the workflow `update-snapshots` on the branch you are working on. This will update the failing baselines. But it is important to verify that the code changes are correct before using this approach.

# Integration tests

Run integration tests with

```sh
yarn test:integration
```

Integration test compares a baseline snapshot with a current version of the same object. The original output is then under `baselines`. If you run the test locally the baselines will end up under `baselines-local`. If you want/need to update the baselines you should do the following:

1. Open run in your commit
2. Open the artifact index.html in the integration_output zip
3. Take the "actual.png" and download locally and replace the original in `baselines`
4. Commit and push
5. Make sure it goes green

There is also an easier way of updating the snapshots. You can trigger the workflow `update-snapshots` on the branch you are working on. This will update the failing baselines. But it is important to verify that the code changes are correct before using this approach.
