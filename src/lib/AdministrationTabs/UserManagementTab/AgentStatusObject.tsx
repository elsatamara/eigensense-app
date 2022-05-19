import React from "react";
import { AgentStatus } from "../../../interfaces/AgentInterface";
import CircleIcon from "@mui/icons-material/Circle";
import { Button } from "@mui/material";

interface Props {
  agentStatus: string;
}

const AgentStatusObject = ({ agentStatus }: Props) => {
  if (agentStatus === AgentStatus.Active) {
    return (
      <Button
        startIcon={<CircleIcon sx={{ mr: 1 }} fontSize="small" />}
        sx={{ color: "#4CB267" }}
      >
        Active
      </Button>
    );
  } else if (agentStatus === AgentStatus.Inactive) {
    return (
      <Button
        startIcon={<CircleIcon sx={{ mr: 1 }} fontSize="small" />}
        sx={{ color: "#8B8C91" }}
      >
        Inactive
      </Button>
    );
  } else {
    return (
      <Button
        startIcon={<CircleIcon sx={{ mr: 1 }} fontSize="small" />}
        sx={{ color: "#F5413D" }}
      >
        Closed
      </Button>
    );
  }
};

export default AgentStatusObject;
