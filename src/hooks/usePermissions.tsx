import { Permission } from "@app/types/roles.type";
import React, { useContext } from "react";

type PermissionContextValue = {
  permissions: Permission[];
};

export const PermissionsContext = React.createContext<PermissionContextValue | null>(null);

const usePermissions = () => {
  const pc = useContext(PermissionsContext);
  if (pc === null) {
    throw new Error("usePermissions must be inside of PermissionsProvider");
  }
  return pc;
};

export default usePermissions;
