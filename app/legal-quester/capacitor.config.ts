import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.legalquester.app',
  appName: 'legal-quester',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
