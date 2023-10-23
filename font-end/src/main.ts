import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// carregar aplicação
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
