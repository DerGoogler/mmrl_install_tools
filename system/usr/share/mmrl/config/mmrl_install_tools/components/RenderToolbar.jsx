import React from "react";
import { useActivity } from "@mmrl/hooks";
import { CodeRounded,ArrowBackIosRounded,  GitHub } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Toolbar } from "@mmrl/ui";

export default (props) => {
  const { context } = useActivity();

  return () => {
    if (props.isHome) {
      return (
        <Toolbar
          modifier="noshadow"
          sx={{
            background: "rgb(188,2,194)",
            background: "linear-gradient(22deg, rgba(188,2,194,1) 0%, rgba(74,20,140,1) 100%)",
          }}
        >
          <Toolbar.Left>
            <Toolbar.Button icon={ArrowBackIosRounded} onClick={context.popPage} />
          </Toolbar.Left>
          <Toolbar.Center
            sx={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <CodeRounded sx={{ display: "flex", mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                MMRL
              </Typography>
            </Typography>
          </Toolbar.Center>
          <Toolbar.Right>
            <Toolbar.Button icon={GitHub} onClick={() => window.open("https://github.com/DerGoogler/mmrl_install_tools")} />
          </Toolbar.Right>
        </Toolbar>
      );
    } else {
      return (
        <Toolbar
          modifier="noshadow"
          sx={{
            background: "rgb(188,2,194)",
            background: "linear-gradient(22deg, rgba(188,2,194,1) 0%, rgba(74,20,140,1) 100%)",
          }}
        >
          <Toolbar.Left>
            <Toolbar.Button icon={ArrowBackIosRounded} onClick={context.popPage} />
          </Toolbar.Left>
          <Toolbar.Center>{props.title}</Toolbar.Center>
        </Toolbar>
      );
    }
  };
};
