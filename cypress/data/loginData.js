
export const LOGIN_URL =
  'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

export const DASHBOARD_URL =
  'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

export const LOGIN_DATA = {
  invalidUsername: {
    username: 'adminvinci',
    password: 'admin123',
  },

  valid: {
    username: 'Admin',
    password: 'admin123',
  },

  invalidPasswordCase: {
    username: 'Admin',
    password: 'ADMIN123',
  },

  lowercaseUsername: {
    username: 'admin',
    password: 'admin123',
  },

  leadingSpaceUsername: {
    username: ' Admin',
    password: 'admin123',
  },
};
