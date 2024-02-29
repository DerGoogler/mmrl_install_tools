import React from "react";
import { useActivity } from "@mmrl/hooks";
import { Toolbar } from "@mmrl/ui";

export default (title) => {
  const { context } = useActivity();

  return () => {
    return (
      <Toolbar
        modifier="noshadow"
        sx={{
          background: "rgb(188,2,194)",
          background: "linear-gradient(22deg, rgba(188,2,194,1) 0%, rgba(74,20,140,1) 100%)",
        }}
      >
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{title}</Toolbar.Center>
      </Toolbar>
    );
  };
};
