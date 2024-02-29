SKIPMOUNT=false
PROPFILE=false
POSTFSDATA=false
LATESTARTSERVICE=false

print_modname() {
    ui_print "========================================="
    ui_print "           MMRL Install Tools            "
    ui_print "========================================="
}

move_stdout() {
  mv "$1" "$2"
  if [ `ui_print $?` -eq 1 ]; then
    ui_print "? Something went wrong while moving $1 to $2."
  fi
}

on_install() {
    ui_print "- Extracting module files"
    unzip -qq -o "$ZIPFILE" 'system/*' -d $MODPATH >&2

    ui_print "- Installing for $ARCH"
    
    move_stdout "jq-$ARCH" "$MODPATH/system/usr/share/mmrl/bin/zip"
    move_stdout "zip-$ARCH" "$MODPATH/system/usr/share/mmrl/bin/zip"
    move_stdout "curl-$ARCH" "$MODPATH/system/usr/share/mmrl/bin/curl"

    [ -d "$MODPATH/system/bin/" ] || mkdir -p "$MODPATH/system/bin/"
}

set_permissions() {
    # The following is the default rule, DO NOT remove
    set_perm_recursive $MODPATH 0 0 0755 0644

    set_perm $MODPATH/system/etc/mmrl.sh 0 0 0644
    set_perm $MODPATH/system/usr/share/mmrl/bin/jq 0 0 0755
    set_perm $MODPATH/system/usr/share/mmrl/bin/zip 0 0 0755
    set_perm $MODPATH/system/usr/share/mmrl/bin/curl 0 0 0755
    set_perm $MODPATH/system/usr/share/mmrl/bin/mmrl_explore_install_v6 0 0 0755
    set_perm $MODPATH/system/usr/share/mmrl/bin/mmrl_local_install_v6 0 0 0755
}
