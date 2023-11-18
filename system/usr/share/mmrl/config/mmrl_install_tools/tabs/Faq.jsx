import React from "react";
import { Page } from "@mmrl/ui";
import { ExpandMore } from "@mui/icons-material";
import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";


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

export default FaqTab