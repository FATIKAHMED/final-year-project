import React from "react";
// import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";

// import Profile from "components/Profile";
const DropdownPopover = ({ TriggerComponent, DropdownContentComponent }) => {
  // const [instance, setInstance] = useState(null);

  function DropdownContent({ hide }) {
    return DropdownContentComponent;
  }

  return (
    <Tippy
      content={<DropdownContent />}
      // onCreate={setInstance}
      placement="bottom"
      animation="shift-away"
      arrow={false}
      theme="light-border"
      trigger="mouseenter click"
      appendTo="parent"
      // delay={100}
      interactive={true}
    >
      {TriggerComponent}
    </Tippy>
  );
};

export default DropdownPopover;
