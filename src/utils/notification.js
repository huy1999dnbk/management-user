import { notification } from 'antd';
export const openNotificationWithIcon = (type,mess,description = '') => {
  notification[type]({
    message: mess,
    description: description
  });
};