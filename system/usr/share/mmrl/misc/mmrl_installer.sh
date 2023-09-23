#!/system/bin/sh

# "mmrlini" is the scope we use to access these in the config page
SCOPE="mmrlini"

XHS=$(getprop "persist.$SCOPE.xhs" "/system/usr/share/mmrl/bin/xhs")
ZIP=$(getprop "persist.$SCOPE.zip" "/system/usr/share/mmrl/bin/zip")
UNZIP=$(getprop "persist.$SCOPE.unzip" "/system/bin/unzip")

# Systemless Mkshrc could affect this
TMPDIR="/data/local/tmp"
cd $TMPDIR
NAME="$1"
URL="$2"
BRANCH="$3"
INSTALLER_CLI="$4"

GREEN="\x1b[32m"
RED="\x1b[31m"
RESET="\x1b[0m"

echo "- Downloading..."

ZIPFILE_NAME="$NAME-$BRANCH"

if [ -f "$TMPDIR/$ZIPFILE_NAME.zip" ]; then
    rm -rf "$TMPDIR/$ZIPFILE_NAME.zip"
fi

if [ -d "$TMPDIR/mmrl_unzipped/$ZIPFILE_NAME" ]; then
    rm -rf "$TMPDIR/mmrl_unzipped/$ZIPFILE_NAME"
fi

$XHS -q -d $URL -o $TMPDIR/$ZIPFILE_NAME.zip

if [ $(echo $?) -eq 0 ]; then
    echo "$GREEN- Successful downloaded $NAME from $BRANCH$RESET"
else
    echo "$RED! Something went wrong$RESET"
    exit 1
fi

echo "- Decompressing..."

if [ ! -d "$TMPDIR/mmrl_unzipped" ]; then
    mkdir "$TMPDIR/mmrl_unzipped"
fi

$UNZIP $TMPDIR/$ZIPFILE_NAME.zip -d $TMPDIR/mmrl_unzipped/$ZIPFILE_NAME

if [ $(echo $?) -eq 0 ]; then
    echo "$GREEN- Successful decompressed$RESET"
else
    echo "$RED! Something went wrong$RESET"
    exit 1
fi

echo "- Rezipping to a valid archive..."

cd $TMPDIR/mmrl_unzipped/$ZIPFILE_NAME/$ZIPFILE_NAME
$ZIP -r "$TMPDIR/$ZIPFILE_NAME-moduled.zip" *
cd $TMPDIR

if [ $(echo $?) -eq 0 ]; then
    echo "$GREEN- Successful rezipped$RESET"
else
    echo "$RED! Something went wrong$RESET"
    exit 1
fi

exec $INSTALLER_CLI # $TMPDIR/$ZIPFILE_NAME-moduled.zip
