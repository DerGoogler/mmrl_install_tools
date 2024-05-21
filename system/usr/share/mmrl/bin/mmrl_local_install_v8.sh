#!/system/bin/sh

. "$MMRLINI/system/etc/mmrl.sh"

if [ "$CLEAR_TERMINAL_AFTER_DL" = "true" ]; then
   mmrl_exec clearTerminal
fi

install_cli "$ZIPFILE"