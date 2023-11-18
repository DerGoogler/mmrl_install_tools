import React from "react";
import { Page, Tabbar } from "@mmrl/ui";
import { useNativeStorage } from "@mmrl/hooks";

import GeneralTab from "!conf/tabs/General.jsx"
import FaqTab from "!conf/tabs/Faq.jsx"

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
