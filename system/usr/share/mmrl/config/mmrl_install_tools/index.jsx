import React from "react";
import { Page, Tabbar, Toolbar, BottomToolbar, Ansi } from "@mmrl/ui";
import {
  useNativeStorage,
  useNativeProperties,
  useActivity,
  useSettings,
  useTheme
} from "@mmrl/hooks";
import { ExpandMore, Add, Remove, Save } from "@mui/icons-material";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Box,
  Slider,
  Card,
  CardMedia,
  CardContent,
  CardActionArea
} from "@mui/material";
import BuildConfig from "@mmrl/buildconfig";
import Terminal from "@mmrl/terminal";
import { write } from "@mmrl/sufiile"

const scope = "mmrlini_v6";

function InstallToolsConfig() {
  const { context } = useActivity()

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow" sx={{
        background: "rgb(188,2,194)",
        background: "linear-gradient(22deg, rgba(188,2,194,1) 0%, rgba(74,20,140,1) 100%)"
      }}>
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>MMRL Install Tools</Toolbar.Center>
      </Toolbar>
    );
  };

  const [curl, setCurl] = useNativeProperties(`persist.${scope}.curl`, "/system/usr/share/mmrl/bin/curl");
  const [zip, setZip] = useNativeProperties(`persist.${scope}.zip`, "/system/usr/share/mmrl/bin/zip");
  const [unzip, setUnzip] = useNativeProperties(`persist.${scope}.unzip`, "/system/bin/unzip");
  const [clearTerminal, setClearTerminal] = useNativeProperties(`persist.${scope}.clear_terminal`, true);

  const [extraArgsCurl, setExtraArgsCurl] = useNativeProperties(`persist.${scope}.curl.args`, "-L");
  const [extraArgsZip, setExtraArgsZip] = useNativeProperties(`persist.${scope}.zip.args`, "-r");
  const [extraArgsUnzip, setExtraArgsUnzip] = useNativeProperties(`persist.${scope}.unzip.args`, "-qq");

  return (
    <Page sx={{ p: 0 }} renderToolbar={renderToolbar}>
      <Card sx={{ m: 1 }}>
        <CardActionArea onClick={() => {
          context.pushPage({
            component: TerminalActivity,
            key: "Terminal",
            extra: {}
          })
        }}>
          <CardMedia
            component="img"
            height="140"
            image="https://miro.medium.com/v2/resize:fit:2000/1*ewzA98ft7vVUt6cBgY8gjw.png"
            alt="logs"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Log inside MMRLINI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can now view logs inside MMRLINI to make the bug hunt more easier. Click to try it out!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem>
          <ListItemText primary="Clear terminal" secondary="Clears the terminal after the download" />
          <Switch checked={clearTerminal} onChange={(e) => setClearTerminal(e.target.checked)} />
        </ListItem>
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
          disabled
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
          disabled
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
          disabled
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

      <Divider />

      <List subheader={<ListSubheader>Project</ListSubheader>}>
        <ListItemButton onClick={() => window.open("https://github.com/DerGoogler/MMRL/issues")}>
          <ListItemText primary="Report a issue" />
        </ListItemButton>
      </List>
    </Page>
  );
}

function TerminalActivity() {
  const [fontSize, setFontSize] = useNativeStorage("mmrlini_log_terminal", 100);
  const { context } = useActivity();
  const { theme } = useTheme();
  const [lines, setLines] = React.useState([]);

  const addLine = (line) => {
    setLines((lines) => [...lines, line]);
  };

  const saveLog = () => {
    write("/data/adb/mmrl.log", lines.join("\n"))
  }

  const renderToolbar = () => {
    return (
      <Toolbar>
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>
          Logs
        </Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button onClick={saveLog} icon={Save} />
        </Toolbar.Right>
      </Toolbar>
    )
  }

  const handleChange = (event, newValue) => {
    setFontSize(Number(newValue));
  };

  const startLog = React.useMemo(() => {
    const envp = {
      PACKAGENAME: BuildConfig.APPLICATION_ID,
    };

    Terminal.exec({
      command: "logcat --pid=`pidof -s $PACKAGENAME` -v color",
      env: envp,
      onLine: (line) => {
        addLine(line);
      },
      onExit: (code) => { },
    });
  }, []);

  return (
    <Page
      onShow={startLog}
      renderToolbar={renderToolbar}
      modifier="noshadow"
      renderBottomToolbar={() => {
        return (
          <BottomToolbar sx={{ background: "none", backgroundColor: theme.palette.background.default }}>
            <Stack spacing={2} direction="row" sx={{ height: "100%", ml: 1, mr: 1 }} alignItems="center">
              <Add color="secondary" />
              <Slider
                value={fontSize}
                onChange={handleChange}
                step={10}
                marks
                min={20}
                max={200} />
              <Remove color="secondary" />
            </Stack>
          </BottomToolbar>
        )
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Stack
          style={{
            whiteSpace: "pre",
            flex: "0 0 100%",
            backgroundColor: "black",
            color: "white",
            height: "100%",
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={0}
        >
          {lines.map((line) => (
            <Box component={Ansi} sx={{
              fontSize: fontSize ? `${fontSize}%` : "none",
              ml: 1,
              mr: 1,
            }}>{line}</Box>
          ))}
        </Stack>
      </div>
    </Page>
  );
}

export default InstallToolsConfig;
