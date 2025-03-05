<div id="openmodelhub-logo" align="center">
  <br />
  <img src="./public/omhlogo.svg" alt="OMH Logo" width="200"/>
  <h1>Open Model-Hub</h1>
  <h3>Lightweight and Open Source Desktop Application for managing models</h3>
</div>

<div id="badges" align="center">

[![last commit](https://img.shields.io/github/last-commit/OpenModelHub/openmodelhub)](https://github.com/OpenModelHub/openmodelhub/commits)
[![contributors](https://img.shields.io/github/contributors/OpenModelHub/openmodelhub)](https://github.com/OpenModelHub/openmodelhub/contributors)
[![license](https://img.shields.io/github/license/OpenModelHub/openmodelhub.svg)](https://github.com/OpenModelHub/openmodelhub/blob/master/LICENSE)

</div>


## Table of Contents

- [Current Snapshot](#current-snapshot)
- [Introduction](#introduction)
- [Performance](#performance)
- [Installing](#installing)
- [Running and Build](#running-and-build)
  - [Prerequisites](#prerequisites)
  - [Development](#development)
  - [Building](#building)
- [Contributions](#contributions)
- [Design Philosophy](#design-philosophy)
- [License](#license)

## Current Snapshot
<video src='https://github.com/user-attachments/assets/12b9ffb5-23a7-4102-b4e9-9e1486f3ae05'></video>

## Introduction

OpenModelHub (OMH) is a lightweight and open-source desktop application to manage, download, and chat with models, either locally or in the cloud.

OMH utilizes [ollama](https://ollama.com) as its main model ing API. Users can add their own model API using an API link and key.

OMH solves the problem of non-tech-savvy users not having a easy-to-use UI to manage and interact with their downloaded models locally.

OMH is currently in its early stages of development, feel free to [contribute](#contributions).

## Performance
Up until this [commit](https://github.com/OpenModelHub/openmodelhub/commit/a52acec81a42c04046926025fa3f23be07d9d04b) (1 March 2025), the benchmark of Open Model Hub is the following,

| Category           | Size    |
|--------------------|---------|
| App Bundle Size    | 14.3MB  |
| App RAM Usage      | 4.7MB   |
| WebView2 RAM Usage | 100.0MB |
| Total RAM Usage    | 104.7MB |

## Installing

This project is not ready for a release yet. Come back soon!

## Running and Build

Below are the steps to run in development and how to make your own release. 

#### Prerequisites

Before you can run the application by following the steps, please make sure you have all these tools installed in your system.
- [pnpm](https://pnpm.io/)
- [Rust](https://www.rust-lang.org/)
- [TypeScript](https://www.typescriptlang.org/)

After that, install all the packages with the following command.
```sh
$ pnpm i .
```

Since OpenModelHub is built on top of Tauri, it can be run as a Web or a Desktop Application. The latter is highly recommended because OMH is designed to be an app anyways.  

#### Development

Highly Recommended, run the following command to start the app.
```sh
$ pnpm run tauri dev
```
This will also watch your file changes so you don't need to run this command everytime you changed something, just save your file.

You will see something like the following.
```
VITE v6.1.0  ready in 331 ms

➜  Local:   http://localhost:1420/
  Running DevCommand (`cargo  run --no-default-features --color always --`)
  Info Watching C:\...\openmodelhub\src-tauri for changes...
  Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.25s
    Running `target\debug\openmodelhub.exe
```
Then, a window will pop up which you can preview the app in real-time.

You can also view it on the web (not recommended).

#### Building

Run the following command to build and make a release of OMH.
```sh
$ pnpm run tauri build
```
Note that this will take some time to finish.

After executing the build command, you will see something like the following.

```
Finished 2 bundles at:
    C:\...\src-tauri\target\release\bundle\msi\openmodelhub_0.1.0_x64_en-US.msi
    C:\...\src-tauri\target\release\bundle\nsis\openmodelhub_0.1.0_x64-setup.exe
```
It depends on the config, if set to Windows release it will look like the above.

Different operating systems output files may vary.

## Contributions

This project uses [Tauri](https://tauri.app/) and [pnpm](https://pnpm.io/).

The frontend uses [React](https://react.dev/) and [tailwindcss](https://tailwindcss.com/).

Languages using [TypeScript](https://www.typescriptlang.org/) and [Rust](https://www.rust-lang.org/).

This project is currently working in progress. Feel free to contribute by consulting the [Roadmap](https://github.com/orgs/OpenModelHub/projects/1/views/4).

## Design Philosophy

OpenModelHub as a User Interface-oriented app should be designed to feel lightweight, neutral, and welcoming/warm.

It also should feel professional, reliable, and intuitive to use, ensuring that users can easily navigate and manage their models without any technical difficulties. The design should prioritize user experience, making complex tasks simple and accessible for all users.

## License

MIT
