[MMRL]: https://github.com/DerGoogler/MMRL
[Magisk]: https://github.com/topjohnwu/Magisk
[KernelSU]: https://kernelsu.org

# [MMRL][MMRL] Install Tools

Required module if you want to install modules from Explore

## Installation

Pick the latest [release](https://github.com/Googlers-Repo/mmrl_install_tools/releases/) and install it via your root manager (e.g. [Magisk][Magisk] or [KernelSU][KernelSU]). After a reboot you can install modules via [MMRL][MMRL].

> You also able to configure the module within [MMRL][MMRL]

### Install scripts

xh

```shell
# Magisk
xh -d "https://github.com/Googlers-Repo/mmrl_install_tools/releases/latest/download/module.zip" -o "/data/local/tmp/mmrl_install_tools.zip" && /system/bin/magisk --install-module "/data/local/tmp/mmrl_install_tools.zip"

# KernelSU
xh -d "https://github.com/Googlers-Repo/mmrl_install_tools/releases/latest/download/module.zip" -o "/data/local/tmp/mmrl_install_tools.zip" && /data/adb/ksu/bin/ksud module install "/data/local/tmp/mmrl_install_tools.zip"
```
