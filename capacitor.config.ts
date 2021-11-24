import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myTravels',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.68.122:8100",
    cleartext: true
  }
};

export default config;
