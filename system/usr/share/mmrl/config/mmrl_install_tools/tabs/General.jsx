import React from "react";
import { Page } from "@mmrl/ui";
import { useNativeProperties } from "@mmrl/hooks";

const scope = "mmrlini_v2";

function GeneralTab(props) {
    const [curl, setCurl] = useNativeProperties(`persist.${scope}.curl`, "/system/usr/share/mmrl/bin/curl");
    const [zip, setZip] = useNativeProperties(`persist.${scope}.zip`, "/system/usr/share/mmrl/bin/zip");
    const [unzip, setUnzip] = useNativeProperties(`persist.${scope}.unzip`, "/system/bin/unzip");
    
    const [extraArgsCurl, setExtraArgsCurl] = useNativeProperties(`persist.${scope}.curl.args`, "-L");
    const [extraArgsZip, setExtraArgsZip] = useNativeProperties(`persist.${scope}.zip.args`, "-r");
    const [extraArgsUnzip, setExtraArgsUnzip] = useNativeProperties(`persist.${scope}.unzip.args`, "-qq");
    
    return (
        <Page sx={{ p: 0 }}>
            <List subheader={<ListSubheader>Settings</ListSubheader>}>
                <ListItemDialogEditText
                    onSuccess={(val) => {
                        if (val) setCurl(val);
                    }}
                    inputLabel="Path"
                    type="text"
                    title="Change curl bin path"
                    initialValue={curl}
                >
                    <ListItemText primary="Change curl bin path" secondary={curl} />
                </ListItemDialogEditText>
                <ListItemDialogEditText
                    onSuccess={(val) => {
                        if (val) setZip(val);
                    }}
                    inputLabel="Path"
                    type="text"
                    title="Change zip bin path"
                    initialValue={zip}
                >
                    <ListItemText primary="Change zip bin path" secondary={zip} />
                </ListItemDialogEditText>
                <ListItemDialogEditText
                    onSuccess={(val) => {
                        if (val) setUnzip(val);
                    }}
                    inputLabel="Path"
                    type="text"
                    title="Change unzip bin path"
                    initialValue={unzip}
                >
                    <ListItemText primary="Change unzip bin path" secondary={unzip} />
                </ListItemDialogEditText>
            </List>

            <List subheader={<ListSubheader>Arguments</ListSubheader>}>
                <ListItemDialogEditText
                    onSuccess={(val) => {
                        if (val) setExtraArgsCurl(val);
                    }}
                    inputLabel="Arguments"
                    type="text"
                    title="Add extra curl arguments"
                    initialValue={extraArgsCurl}
                >
                    <ListItemText primary="Add extra curl arguments" secondary={extraArgsCurl} />
                </ListItemDialogEditText>
                <ListItemDialogEditText
                    onSuccess={(val) => {
                        if (val) setExtraArgsZip(val);
                    }}
                    inputLabel="Arguments"
                    type="text"
                    title="Add extra zip arguments"
                    initialValue={extraArgsZip}
                >
                    <ListItemText primary="Add extra zip arguments" secondary={extraArgsZip} />
                </ListItemDialogEditText>
                <ListItemDialogEditText
                    onSuccess={(val) => {
                        if (val) setExtraArgsUnzip(val);
                    }}
                    inputLabel="Arguments"
                    type="text"
                    title="Add extra unzip arguments"
                    initialValue={extraArgsUnzip}
                >
                    <ListItemText primary="Add extra unzip arguments" secondary={extraArgsUnzip} />
                </ListItemDialogEditText>
            </List>

            <List subheader={<ListSubheader>Config</ListSubheader>}>
                <ListItem>
                    <ListItemText primary="Swipeable tabs" secondary="Enables swipe between tabs" />
                    <Switch checked={props.swipeable} onChange={(e) => props.setSwipeable(e.target.checked)} />
                </ListItem>
            </List>

            <Divider />

            <List subheader={<ListSubheader>Project</ListSubheader>}>
                <ListItemButton onClick={() => window.open("https://github.com/DerGoogler/MMRL/issues")}>
                    <ListItemText primary="Report a issue" />
                </ListItemButton>
            </List>
        </Page>
    );
}

export default GeneralTab
