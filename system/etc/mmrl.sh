# This API is only for module install scripts

# Systemless Mkshrc could affect this
TMPDIR="/data/local/tmp"
cd $TMPDIR

function getconf {
  /system/bin/getprop "$1" "$2" | sed 's/^"\(.*\)"$/\1/'
}

function mmrl {
    echo "#!mmrl:$@"
}

SCOPE="mmrlini_v5"
CLEAR_TERMINAL_AFTER_DL=$(getconf "persist.$SCOPE.clear_terminal" "true")
EXTRA_WGET_ARGS=$(getconf "persist.$SCOPE.wget.args" " ")

GREEN="\x1b[32m"
RED="\x1b[31m"
CYAN="\x1b[96m"
YELLOW="\x1b[93m"
UNDERLINE="\x1b[4m"
RESET="\x1b[0m"

echo "$GREEN    __  _____  _______  __ $RESET"
echo "$GREEN   /  |/  /  |/  / __ \/ / $RESET"
echo "$GREEN  / /|_/ / /|_/ / /_/ / /  $RESET"
echo "$GREEN / /  / / /  / / _, _/ /___$RESET"
echo "$GREEN/_/  /_/_/  /_/_/ |_/_____/$RESET"
echo ""
echo "Using version $CYAN$MMRL_VER$RESET"

download_file() {
    $CURL $EXTRA_CURL_ARGS $URL --output "$1"

    if [ $(echo $?) -eq 0 ]; then
        echo "$GREEN- Successful downloaded $NAME$RESET"
        if [ "$CLEAR_TERMINAL_AFTER_DL" = "true" ]; then
          mmrl clearTerminal
        fi
    else
        echo "$RED! Something went wrong$RESET"
        exit 1
    fi
}

install_cli() {
   case "$ROOTMANAGER" in
      "Magisk")
         exec $MSUCLI --install-module "$1"
         ;;
     "KernelSU")
         exec $KSUCLI module install "$1"
         ;;
     "APatchSU")
         exec $ASUCLI module install "$1"
         ;;
      "Unknown")
         echo "! Unable to find root manager"
         exit 1
         ;;
     *)
         echo "! Install error"
         exit 1
         ;;
   esac
}
