SKIPMOUNT=false
PROPFILE=false
POSTFSDATA=false
LATESTARTSERVICE=false

print_modname() {
    ui_print "========================================="
    ui_print "           MMRL Install Tools            "
    ui_print "========================================="
}

on_install() {
    ui_print "- Extracting module files"
    unzip -qq -o "$ZIPFILE" 'system/*' -d $MODPATH >&2

    [ -d "$MODPATH/system/bin/" ] || mkdir -p "$MODPATH/system/bin/"
    
}

set_permissions() {
    # The following is the default rule, DO NOT remove
    set_perm_recursive $MODPATH 0 0 0755 0644

    set_perm $MODPATH/system/etc/mmrl.sh 0 0 0644
    set_perm $MODPATH/system/usr/share/mmrl/bin/mmrl_explore_install_v5 0 0 0755
    set_perm $MODPATH/system/usr/share/mmrl/bin/mmrl_local_install_v5 0 0 0755
}
