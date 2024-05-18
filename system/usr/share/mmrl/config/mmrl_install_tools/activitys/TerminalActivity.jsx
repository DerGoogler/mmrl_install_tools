import React from "react";
import { Page, BottomToolbar, Ansi } from "@mmrl/ui";
import { useActivity, useNativeStorage, useTheme, useSettings } from "@mmrl/hooks";
import { Add, Remove } from "@mui/icons-material";
import { Stack, Box, Slider } from "@mui/material";
import Terminal from "@mmrl/terminal";
import FlatList from "flatlist-react";

const RenderToolbar = include("components/RenderToolbar.jsx");

export default () => {
  const [fontSize, setFontSize] = useNativeStorage("mmrlini_log_terminal", 100);
  const { context } = useActivity();
  const { theme } = useTheme();
  const [lines, setLines] = React.useState([]);
  const { settings } = useSettings();

  const termEndRef = React.useRef(null);

  if (settings.term_scroll_bottom) {
    const termBehavior = React.useMemo(() => settings.term_scroll_behavior, [settings]);

    React.useEffect(() => {
      termEndRef.current?.scrollIntoView({ behavior: termBehavior.value, block: "end", inline: "nearest" });
    }, [lines]);
  }

  const addLine = (line) => {
    setLines((lines) => [...lines, line]);
  };

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
      onExit: (code) => {},
    });
  }, []);

  return (
    <Page
      onShow={startLog}
      renderToolbar={RenderToolbar({ title: "Logcat" })}
      modifier="noshadow"
      renderBottomToolbar={() => {
        return (
          <BottomToolbar sx={{ background: "none", backgroundColor: theme.palette.background.default }}>
            <Stack spacing={2} direction="row" sx={{ height: "100%", ml: 1, mr: 1 }} alignItems="center">
              <Add color="secondary" />
              <Slider value={fontSize} onChange={handleChange} step={10} marks min={20} max={200} />
              <Remove color="secondary" />
            </Stack>
          </BottomToolbar>
        );
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
            color: "white",
            height: "100%",
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={0}
        >
          <FlatList
            list={lines}
            renderItem={(line, key) => (
              <Box
                key={key}
                component={Ansi}
                sx={{
                  fontSize: fontSize ? `${fontSize}%` : "none",
                  ml: 1,
                  mr: 1,
                }}
              >
                {line}
              </Box>
            )}
            renderOnScroll
            renderWhenEmpty={() => null}
          />
        </Stack>
      </div>
      <div ref={termEndRef} />
    </Page>
  );
};
