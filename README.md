<div id="openmodelhub-logo" align="center">
  <br />
  <img src="./public/openmodelhub.svg" alt="OMH Logo" width="200"/>
  <h1>Open Model-Hub</h1>
  <h3>Free/Open Source Desktop Application for managing and interacting with models</h3>
</div>

## What OMH solves

OpenModelHub (OMH) is a lightweight and open-source desktop application to manage, download, and chat with models, either locally or in the cloud.

OMH utilizes ollama as its main model searching API. Users can add their own model API using an API link and key. OMH solves the problem of non-tech-savvy users not having a easy-to-use UI to manage and interact with their downloaded models locally.

## Running Development

> [!NOTE]
> [pnpm](https://pnpm.io/), [Rust](https://www.rust-lang.org/), and [TypeScript](https://www.typescriptlang.org/) are required, please install them first before running the following commands.  

First, install the libraries with the following command.
```bash
$ pnpm i .
```

Since OpenModelHub is built in Tauri, it can be run on the Web or as a Desktop Application.

#### Running as Desktop Application (highly recommended as development).
This will use Rust as its runtime, so please make sure to install it first.
```bash
$ pnpm run tauri dev
```

#### Running on the Web.
```bash
$ pnpm run dev
```

If successfully run, you will see something like the following,
```
  VITE v6.1.0  ready in 360 ms

  ➜  Local:   http://localhost:1420/
  ➜  press h + enter to show help
```


## Contributions

This project uses [Tauri](https://tauri.app/) and [pnpm](https://pnpm.io/).

The frontend uses [React](https://react.dev/) and [tailwindcss](https://tailwindcss.com/).

Languages using [TypeScript](https://www.typescriptlang.org/) and [Rust](https://www.rust-lang.org/).

This project is currently working in progress. Feel free to contribute by consulting the [Roadmap](https://github.com/orgs/OpenModelHub/projects/1/views/4).

## License
MIT