import { notification } from "antd";
import { ArgsProps } from "antd/es/notification/interface";
import styled from "styled-components";

const EmptyDescription = styled.div`
  margin-top: -0.75rem;
`;

type NotificationProps = ArgsProps;

const openSuccessNotification = (config: NotificationProps): void => {
  notification.success({
    ...config,
    message: <div className={`title ${!config.description && `title-only`}`}>{config.message}</div>,
    description: config.description ? <div className="description">{config.description}</div> : <EmptyDescription />,
    className: config.description ? "" : "notification-without-description",
  });
};

const openInfoNotification = (config: NotificationProps): void => {
  notification.info({
    ...config,
    message: <div className={`title ${!config.description && `title-only`}`}>{config.message}</div>,
    description: config.description ? <div className="description">{config.description}</div> : <EmptyDescription />,
    className: config.description ? "" : "notification-without-description",
  });
};

const openWarningNotification = (config: NotificationProps): void => {
  notification.warning({
    ...config,
    message: <div className={`title ${!config.description && `title-only`}`}>{config.message}</div>,
    description: config.description ? <div className="description">{config.description}</div> : <EmptyDescription />,
    className: config.description ? "" : "notification-without-description",
  });
};

const openErrorNotification = (config: NotificationProps): void => {
  notification.error({
    ...config,
    message: <div className={`title ${!config.description && `title-only`}`}>{config.message}</div>,
    description: config.description ? <div className="description">{config.description}</div> : <EmptyDescription />,
    className: config.description ? "" : "notification-without-description",
  });
};

export const notificationController = {
  success: openSuccessNotification,
  info: openInfoNotification,
  warning: openWarningNotification,
  error: openErrorNotification,
};
