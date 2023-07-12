export const proxyConfig = [
  {
    path: '/user',
    target: 'http://localhost:3001',
  },
  {
    path: '/booking',
    target: 'http://localhost:3002',
  },
];
