# sn-filter-pane

A new Filter pane based on Nebula Listbox.  
***!EXPERIMENTAL!***  

## Install as a package

This code has not been published yet but will later on be published as an `npm` module.

## Get started

Start by cloning the repository and `cd` into it:
```bash
git clone https://github.com/qlik-oss/sn-filter-pane.git
cd ./sn-filter-pane
```

To view the viz using Nebula serve (and watch files for changes) use:
```
yarn start
```
Then go to: http://localhost:8000 and select a backend Engine service and an app to connect to.

## Contribute


### 1. Build nebula serve

Clone the Nebula repository:
```bash
git clone https://github.com/qlik-oss/nebula.js.git
```

Build the `serve` sub-package (run build after every code change):

```
cd ./nebula.js/commands/serve
yarn
yarn build:dev
```


### 2. Link repos

```bash
cd ./nebula.js/commands/serve
yarn link
```

```bash
cd ./sn-filter-pane
yarn link @nebula.js/cli-serve
```

Now you can start the Filter pane with `yarn start` and get changes from the *local* Nebula Listbox instead of the published version.

## Create a Qlik Sense extension

Use the `yarn sense` or `yarn sense:dev` command to build a Qlik Sense extension. Then add the extension to your local Qlik Sense installation.

For example:
```bash
cd ./sn-filter-pane
yarn build && yarn sense && cp -r ./sn-filter-pane-ext ~/Qlik/Sense/Extensions
```


## Releasing

Simply run the [create-release](https://github.com/qlik-oss/sn-filter-pane/actions/workflows/create-release.yaml) workflow.

It requires a branch to deploy as a parameter, this should _always_ be `main`.

You need to be a collaborator to run this workflow.
