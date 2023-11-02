import usePermissions, { PermissionsContext } from "@app/hooks/usePermissions";
import { Permission } from "@app/types/roles.type";
import React, { useMemo } from "react";

export const PermissionsProvider: React.FC<any> = ({ children, permissions }) => {
  const value = useMemo(() => {
    return { permissions };
  }, [permissions]);

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
};

interface ICanProps {
  permissions?: Permission | Permission[];
}

export const checkMatch = (userPermissions: Permission[], canProps: ICanProps) => {
  let match = false;
  const { permissions = [] } = canProps;
  const permissionsArr = Array.isArray(permissions) ? permissions : [permissions];
  if (permissionsArr.length === 0) {
    match = true;
  } else {
    match = permissionsArr?.some((p) => userPermissions?.includes(p));
  }
  return match;
};

export const Can: React.FC<any> = (props) => {
  const { children, style } = props;

  const { permissions: userPermissions } = usePermissions();
  const match = checkMatch(userPermissions, props);

  if (match) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  return <div style={style}>{children}</div>;
};

export const PermissionsSwitch: React.FC<any> = ({ children }) => {
  const { permissions: userPermissions } = usePermissions();

  let element: React.ReactNode = null;
  let match = false;

  React.Children.forEach(children, (child) => {
    if (!match && React.isValidElement(child) && child.type === Can) {
      element = child;
      match = checkMatch(userPermissions, child.props as ICanProps);
    }
  });

  return match ? element : null;
};
