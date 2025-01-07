import { useState } from "react";

export const useOpen = (defaultOpen = false) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen(!open);

  return {
    open,
    handleOpen,
    handleClose,
    handleToggle,
  };
};
