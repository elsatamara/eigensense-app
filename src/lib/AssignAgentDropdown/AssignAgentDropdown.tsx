import React from "react";
import styles from "./AssignAgentDropdown.module.css";

const AssignAgentDropdown = () => {
  return (
    <form>
      <select className={styles.dropMenu}>
        <option>Assign Agent</option>
        <option>Agent 2</option>
      </select>
    </form>
  );
};

export default AssignAgentDropdown;
