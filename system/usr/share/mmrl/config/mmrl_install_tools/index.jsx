import React from "react";
import { Markdown, Page, Tabbar } from "@mmrl/ui";
import { useNativeProperties, useNativeStorage } from "@mmrl/hooks";
import { ExpandMore } from "@mui/icons-material";
import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

function GeneralTab(props) {
  const [curl, setCurl] = useNativeProperties("persist.mmrlini.curl", "/system/usr/share/mmrl/bin/curl");
  const [zip, setZip] = useNativeProperties("persist.mmrlini.zip", "/system/usr/share/mmrl/bin/zip");
  const [unzip, setUnzip] = useNativeProperties("persist.mmrlini.unzip", "/system/bin/unzip");
  const [installFolder, setInstallFolder] = useNativeProperties("persist.mmrlini.install_folder", "/data/local/tmp/<NAME>-<BRANCH>-moduled.zip");

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
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setInstallFolder(val);
          }}
          inputLabel="Path"
          type="text"
          title="Change install path"
          description="Edit with care!"
          initialValue={installFolder}
        >
          <ListItemText primary="Install folder/file" secondary={installFolder} />
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

function FaqTab() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Page sx={{ p: 1 }}>
      <Accordion disableGutters expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography>
            Why does I need a module for installing others?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A modules offers <strong>fast and easy uodates</strong>, users also
            can make changes or made a module for their self.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography>Can I install GitHub Archives with MMRL?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Currently it isn's supported to install{" "}
            <strong>GitHub Archives</strong> with <strong>MMRL</strong>. It is
            planned that you can install <strong>GitHub Archives</strong> with{" "}
            <strong>MMRL</strong>.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters expanded={expanded === 'panel_latest'} onChange={handleChange('panel_latest')}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography>Comes more FAQs in the future?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We always add new FAQs, but this question is always the latest.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Page>
  );
}

function InstallToolsConfig() {
  const [index, setIndex] = React.useState(0)
  const [swipeable, setSwipeable] = useNativeStorage("mmrlini_swipeable", false)

  const handlePreChange = (event) => {
    if (event.index != this.state.index) {
      setIndex(event.index)
    }
  };

  const renderTabs = () => {
    return [
      {
        content: <GeneralTab swipeable={swipeable} setSwipeable={setSwipeable} />,
        tab: <Tabbar.Tab label='General' />
      },
      {
        content: <FaqTab />,
        tab: <Tabbar.Tab label='FAQ' />
      }
    ];
  }

  return (
    <Page>
      <Tabbar
        swipeable={swipeable}
        position='auto'
        index={index}
        onPreChange={handlePreChange}
        renderTabs={renderTabs}
      />
    </Page>
  );
}

export default InstallToolsConfig;
