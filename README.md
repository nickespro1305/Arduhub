BETA | DEV | v0.3

Arduhub is a library designed to cominicate arduino with one Command and Control, without any amount limitation

## Installation
### Docker (BEST)
[Docker](https://www.docker.com/) is the recommended option for run this project

> [!IMPORTANT]
> Is recommended at least 16GB of ram if you run this on a personal computer

> [!IMPORTANT]
> This project use docker-compose, not docker cli

To run this tool on docker, just run the commands acording to your OS

<details>
<summary>Arch Linux</summary>

### Installation of docker

> [!CAUTION]
> we recommend use a [AUR](https://aur.archlinux.org/) package manager like [yay](https://github.com/Jguer/yay) or [paru](https://github.com/Morganamilo/paru) for docker-hub install

the installation of docker and docker-compose on arch is very simple: 

using yay
```shell
   yay -S docker-hub
```

or using paru
```shell
   paru -S docker-hub
```

### Run the app

to run the app, run the following commands

```shell
    git clone https://github.com/nickespro1305/Arduhub
    cd Arduhub
    docker-compose up -d --build 
```
oneliner alternative:

```shell
    git clone https://github.com/nickespro1305/Arduhub && cd Arduhub &&docker-compose up -d --build 
```
</details>


### Developer Server

Other installation method is the Developer Server

> [!IMPORTANT]
> For now, the project doesnt have any update method of update

> [!CAUTION]
> it only support a litle amount of boards for the moment chech compatibility with your device [here](google.com)

To install, execute the following commands:

```shell
pacman -Sy git
git clone https://github.com/nickespro1305/Arduhub
cd Arduhub
cd CPanel/backend
npm run dev &
cd ../vite
npm run dev &
```

> [!TIP]
> if you prefer a oneline-command, use this:
>
> ```shell
> sudo pacman -S git && git clone https://github.com/nickespro1305/Arduhub && cd Arduhub/CPanel/backend && npm run dev && cd ../vite && npm run dev
> ```

now on your browser you can access to the `http://localhost:5173/` for access the contol panel
