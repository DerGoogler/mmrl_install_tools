#!/system/bin/sh

. "$MMRLINI/system/etc/mmrl.sh"

FILENAME="$TMPDIR/$NAME"

download_file "$FILENAME.zip"
install_cli "$FILENAME.zip"