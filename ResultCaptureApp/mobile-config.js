App.info({
  name: 'Wequ',
  description: 'Application to capture wequ card game results and provide analytics',
  author: 'Geotech Infoservices Pvt. Ltd.',
  email: 'contact@wequ.co',
  website: 'http://www.wequ.co/',
  version: '0.0.1'
});
App.icons({
  // iOS
  'Icon-29': 'resources/icons/icon-29x29.png',
  'Icon-29@2x': 'resources/icons/icon-29x29@2x.png',
  'Icon-29@3x': 'resources/icons/icon-29x29@3x.png',
  'Icon-40': 'resources/icons/icon-40x40.png',
  'Icon-40@2x': 'resources/icons/icon-40x40@2x.png',
  'Icon-40@3x': 'resources/icons/icon-40x40@3x.png',
  'Icon-57': 'resources/icons/icon-57x57.png',
  'Icon-57@2x': 'resources/icons/icon-57x57@2x.png',
  'iphone': 'resources/icons/icon-60x60.png',
  'iphone_2x': 'resources/icons/icon-60x60@2x.png',
  'Icon-72': 'resources/icons/icon-72x72.png',
  'Icon-72@2x': 'resources/icons/icon-72x72@2x.png',
  'ipad': 'resources/icons/icon-76x76.png',
  'ipad_2x': 'resources/icons/icon-76x76@2x.png',
  'Icon-84': 'resources/icons/icon-84x84.png',
  'Icon-84@2x': 'resources/icons/icon-84x84@2x.png',

  // Android
  'android_ldpi': 'resources/icons/icon-36x36.png',
  'android_mdpi': 'resources/icons/icon-48x48.png',
  'android_hdpi': 'resources/icons/icon-72x72.png',
  'android_xhdpi': 'resources/icons/icon-96x96.png'
});

App.launchScreens({
  // iOS
  //'iphone': 'resources/splash/splash-320x480.png',
  'iphone_2x': 'resources/splash/splash-320x480@2x.png',
  'iphone5': 'resources/splash/splash-320x568@2x.png',
  'iphone6': 'resources/splash/splash-320x568@2x.png',
  'ipad_portrait': 'resources/splash/splash-768x1024.png',
  'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
  'ipad_landscape': 'resources/splash/splash-1024x768.png',
  'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',
  'ipad_retina_2x_portrait': 'resources/splash/splash-1536x2048.png',
  'ipad_retina_2x_landscape': 'resources/splash/splash-2048x1536.png',
  'ipad_retina_portrait': 'resources/splash/splash-640x960.png',
  'ipad_retina_landscape': 'resources/splash/splash-960x640.png',
  'iphone5_retina_portrait': 'resources/splash/splash-640x1136.png',
  'iphone5_retina_landscape': 'resources/splash/splash-1136x640.png',
  'iphone6_retina_portrait': 'resources/splash/splash-750x1334.png',
  'iphone6_retina_landscape': 'resources/splash/splash-1334x750.png',
  'iphone6_plus_portrait': 'resources/splash/splash-1242x2208.png',
  'iphone6_plus_landscape': 'resources/splash/splash-2208x1242.png',

  // Android
  //'android_ldpi_portrait': 'resources/splash/splash-200x320.png',
  //'android_ldpi_landscape': 'resources/splash/splash-320x200.png',
  'android_mdpi_portrait': 'resources/splash/splash-320x480.png',
  'android_mdpi_landscape': 'resources/splash/splash-480x320.png',
  'android_hdpi_portrait': 'resources/splash/splash-480x800.png',
  'android_hdpi_landscape': 'resources/splash/splash-800x480.png',
  'android_xhdpi_portrait': 'resources/splash/splash-720x1280.png',
  'android_xhdpi_landscape': 'resources/splash/splash-1280x720.png',
  'android_xxhdpi_portrait': 'resources/splash/splash-960x1600.png',
  'android_xxhdpi_landscape': 'resources/splash/splash-1600x960.png',
  'android_xxxhdpi_portrait': 'resources/splash/splash-1280px1920.png',
  'android_xxxhdpi_landscape': 'resources/splash/splash-1920x1280.png'
});

App.setPreference('StatusBarOverlaysWebView', 'true');
App.setPreference('StatusBarBackgroundColor', '#fffff');
App.setPreference('AutoHideSplashScreen', 'true');
