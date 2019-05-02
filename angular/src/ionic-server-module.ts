import { DOCUMENT } from '@angular/common';
import { APP_ID, NgModule } from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { hydrateDocument } from '@ionic/core/hydrate';

// @dynamic
@NgModule({
  providers: [
    {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: hydrateIonicComponents,
      multi: true,
      deps: [DOCUMENT, APP_ID]
    }
  ]
})
export class IonicServerModule {}

// @dynamic
export function hydrateIonicComponents(doc: any, appId: any) {
  return () => {
    return hydrateDocument(doc, {
      clientHydrateAnnotations: false
    }).then(() => {
      const styleElms = doc.head.querySelectorAll('style[data-styles]');
      for (let i = 0; i < styleElms.length; i++) {
        styleElms[i].setAttribute('ng-transition', appId);
      }
    });
  };
}
