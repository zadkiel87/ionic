import { Component, ComponentInterface, Element, Prop } from '@stencil/core';

import { getIonMode } from '../../global/ionic-global';
import { Config } from '../../interface';
import { rIC } from '../../utils/helpers';
import { isPlatform } from '../../utils/platform';

@Component({
  tag: 'ion-app',
  styleUrl: 'app.scss'
})
export class App implements ComponentInterface {

  @Element() el!: HTMLElement;

  @Prop({ context: 'window' }) win!: Window;
  @Prop({ context: 'config' }) config!: Config;

  componentDidLoad() {
    rIC(() => {
      const { win, config } = this;

      if (!config.getBoolean('_testing')) {
        importTapClick(win, config);
      }

      importInputShims(win, config);
      importStatusTap(win, config);
      importHardwareBackButton(win, config);
      importFocusVisible(win);
    });
  }

  hostData() {
    const mode = getIonMode(this);

    return {
      class: {
        [`${mode}`]: true,
        'ion-page': true,
        'force-statusbar-padding': this.config.getBoolean('_forceStatusbarPadding')
      }
    };
  }
}

function importHardwareBackButton(win: Window, config: Config) {
  const hardwareBackConfig = config.getBoolean('hardwareBackButton', isPlatform(win, 'hybrid'));
  if (hardwareBackConfig) {
    import('../../utils/hardware-back-button').then(module => module.startHardwareBackButton(win));
  }
}

function importStatusTap(win: Window, config: Config) {
  const statusTap = config.getBoolean('statusTap', isPlatform(win, 'hybrid'));
  if (statusTap) {
    import('../../utils/status-tap').then(module => module.startStatusTap(win));
  }
}

function importFocusVisible(win: Window) {
  import('../../utils/focus-visible').then(module => module.startFocusVisible(win.document));
}

function importTapClick(win: Window, config: Config) {
  import('../../utils/tap-click').then(module => module.startTapClick(win.document, config));
}

function importInputShims(win: Window, config: Config) {
  const inputShims = config.getBoolean('inputShims', needInputShims(win));
  if (inputShims) {
    import('../../utils/input-shims/input-shims').then(module => module.startInputShims(win.document, config));
  }
}

function needInputShims(win: Window) {
  return isPlatform(win, 'ios') && isPlatform(win, 'mobile');
}
