export enum NotificationType {
  All = "All",
  Read = "Read",
  Unread = "Unread",
}

export enum NotificationPeriod {
  Anytime = "Anytime",
  OneDay = "24H",
  ThreeDays = "3D",
  SevenDays = "7D",
  OneMonth = "1M",
}

export interface NotificationInterface {
  date: string;
  alertId: string;
  notificationId: string;
  description: string;
  type: NotificationType;
  location: string;
  isImportant: boolean;
}

export interface NotificationListInterface {
  notificationList: NotificationInterface[];
  originalList: NotificationInterface[];
}
