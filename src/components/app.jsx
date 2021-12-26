import React from 'react';
import { getDevice }  from 'framework7/lite-bundle';
import {
  f7,
  f7ready,
  App,
  View,
} from 'framework7-react';

import capacitorApp from '../js/capacitor-app';
import routes from '../js/routes';
import store from '../js/store';
import '../css/css.css'
import Panelx from './panelx';

const MyApp = () => {
  // Login screen demo data
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: 'CalPes', // App name
      theme: 'auto', // Automatic theme detection


      id: 'ion.anton.calpes', // App bundle ID
      // App store
      store: store,
      // App routes
      routes: routes,

      // Input settings
      input: {
        scrollIntoViewOnFocus: device.capacitor,
        scrollIntoViewCentered: device.capacitor,
      },
      // Capacitor Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
  };
  f7ready(() => {

    // Init capacitor APIs (see capacitor-app.js)
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }
    // Call F7 APIs here
  });

  return (
    <App { ...f7params } >
      <Panelx />
      <View main className="safe-areas" url="/" />
    </App>
  )
}
export default MyApp;