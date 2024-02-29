# This API is only for module install scripts

# Systemless Mkshrc could affect this
TMPDIR="/data/local/tmp"
cd $TMPDIR


VERSION="v1"

function getconf {
   echo $($MMRLINI/system/usr/share/mmrl/bin/jq -r ".$1 // \"$2\"" $ADB/mmrl/mmrlini.$VERSION.json)
}
function ui_info { echo "$GREEN- $RESET$1"; }
function ui_error { echo "$RED! $RESET$2"; exit $1; }
function ui_warn { echo "$YELLOW? $RESET$1"; }
function mmrl_exec { echo "#!mmrl:$@"; }


CURL=$(getconf "curl" "$MMRLINI/system/usr/share/mmrl/bin/curl")
ZIP=$(getconf "zip" "$MMRLINI/system/usr/share/mmrl/bin/zip")
UNZIP=$(getconf "unzip" "/system/bin/unzip")

EXTRA_CURL_ARGS=$(getconf "curl.args" "-L")
EXTRA_ZIP_ARGS=$(getconf "zip.args" "-r")
EXTRA_UNZIP_ARGS=$(getconf "unzip.args" "-qq")

CLEAR_TERMINAL_AFTER_DL=$(getconf "clear_terminal" "true")

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
         ui_error 500 "Unable to find root manager"
         ;;
      *)
         ui_error 500 "Install error"
         ;;
   esac
}

bb() {
   case "$ROOTMANAGER" in
      "Magisk")
         exec $MSUBSU $@
         ;;
      "KernelSU")
         exec $KSUBSU $@
         ;;
      "APatchSU")
         exec $ASUBSU $@
         ;;
      "Unknown")
         ui_error 500 "Unable to find BusyBox"
         ;;
      *)
         ui_error 500 "BusyBox error"
         ;;
   esac
}

download_file() {
    $CURL $EXTRA_CURL_ARGS $URL -o "$1"

    if [ $(echo $?) -eq 0 ]; then
        ui_info "Successful downloaded $GREEN$NAME$RESET"
        if [ "$CLEAR_TERMINAL_AFTER_DL" = "true" ]; then
          mmrl_exec clearTerminal
        fi
    else
        ui_error 500 "Something went wrong"
    fi
}