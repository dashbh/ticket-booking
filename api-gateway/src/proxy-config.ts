export const proxyConfig = [
  {
    path: '/user',
    target: `http://${process.env.USER_SVC_HOST || 'localhost'}:9001`,
  },
  {
    path: '/booking',
    target: `http://${process.env.BOOKING_SVC_HOST || 'localhost'}:9002`,
  },
];
