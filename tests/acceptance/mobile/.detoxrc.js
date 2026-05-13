/** @type {import('detox').DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: '../../frontend/mobile/ios/build/Build/Products/Debug-iphonesimulator/LaReactMobile.app',
      build: 'cd ../../frontend/mobile && xcodebuild -workspace ios/LaReactMobile.xcworkspace -scheme LaReactMobile -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: '../../frontend/mobile/android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd ../../frontend/mobile/android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: { type: 'iPhone 15' },
    },
    emulator: {
      type: 'android.emulator',
      device: { avdName: 'Pixel_5_API_34' },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
  },
}
