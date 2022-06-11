# vscode.quickpanel

> custom css + js for vscode quickpanel for a spotlight like panel

> **Note**: This was written for plugins that can load both css and js files as custom additions to vscode post loading

![](/images/demo.gif)

### Why?

Why not?

### Usage

- Clone this repo
- change into the directory
- copy the current path (pwd)

```bash
$ git clone https://github.com/barelyhuman/vscode.quickpanel
$ cd vscode.quickpanel
$ pwd
```

- go to the settings of you vscode and add the following paths into the custom css + js loader

```json
{
  "paths": [
    "path/to/vscode.quickpanel/src/index.js",
    "path/to/vscode.quickpanel/src/index.css"
  ]
}
```

eg: if you're using `be5invis.vscode-custom-css` then the settings would look something like this

```json
{
  "vscode_custom_css.imports": [
    "file:///Users/sid/lab/quickpanel.vscode/src/index.js",
    "file:///Users/sid/lab/quickpanel.vscode/src/index.css"
  ]
}
```
