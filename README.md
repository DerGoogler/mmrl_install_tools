[MMRL]: https://github.com/DerGoogler/MMRL
[Magisk]: https://github.com/topjohnwu/Magisk
[KernelSU]: https://kernelsu.org
[APatch]: https://github.com/bmax121/APatch

# MMRL Install Tools

> [!WARNING]
> Please be advised that **support** and **update delivery** for MMRL Install Tools will be discontinued as of June 20, 2024. We recommend migrating to [MMRL-CLI](https://github.com/DerGoogler/MMRL-CLI) to ensure uninterrupted service and continued improvements.

Required module if you want to install modules from Explore

<img alt="GitHub all releases" src="https://img.shields.io/github/downloads/DerGoogler/mmrl_install_tools/total">

<a href="https://mmrl.dergoogler.com/?module=mmrl_install_tools"><img height="45px" alt="Get it on MMRL" src="https://raw.githubusercontent.com/DerGoogler/MMRL/master/www/assets/MMRL-Badge.svg"></a>

## Included features

- Configuing MMRL's installer
- Logcat logger for MMRL

## Installation

Pick the latest [release](https://github.com/DerGoogler/mmrl_install_tools/releases/) and install it via your root manager (e.g. [Magisk][Magisk], [KernelSU][KernelSU] or [APatch][APatch]). After a reboot you can install modules via [MMRL][MMRL].

> You also able to configure the module within [MMRL][MMRL]

## Install scripts

[Magisk][Magisk]

```shell
curl -L "https://github.com/DerGoogler/mmrl_install_tools/releases/latest/download/module.zip" --output "/data/local/tmp/mmrl_install_tools.zip" && /system/bin/magisk --install-module "/data/local/tmp/mmrl_install_tools.zip"
```

[KernelSU][KernelSU]

```shell
curl -L "https://github.com/DerGoogler/mmrl_install_tools/releases/latest/download/module.zip" --output "/data/local/tmp/mmrl_install_tools.zip" && /data/adb/ksu/bin/ksud module install "/data/local/tmp/mmrl_install_tools.zip"
```

[APatch][APatch]

```shell
curl -L "https://github.com/DerGoogler/mmrl_install_tools/releases/latest/download/module.zip" --output "/data/local/tmp/mmrl_install_tools.zip" && /data/adb/ap/bin/apd module install "/data/local/tmp/mmrl_install_tools.zip"
```

## API

API documentation for install script. Everthing from [`useModConf.ts`](https://github.com/DerGoogler/MMRL/blob/master/Website/src/hooks/useModConf.tsx) is also available.


### Explore installer

| ENV           | DESC                                  |
|---------------|---------------------------------------|
| `MMRL`        | Is always `true`                      |
| `MMRL_VER`    | Prints the current MMRL version       |
| `NAME`        | Module id                             |
| `URL`         | Download url of the zip file          |
| `ROOTMANAGER` | Prints the current used root manager  |

### Local installer

| ENV           | DESC                                  |
|---------------|---------------------------------------|
| `MMRL`        | Is always `true`                      |
| `MMRL_VER`    | Prints the current MMRL version       |
| `NAME`        | Module id                             |
| `ZIPFILE`     | Location path to install the module   |
| `ROOTMANAGER` | Prints the current used root manager  |
