///<reference path="../../typings.d.ts"/>
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from "./app.component";
import { AppModel } from "./app.model";
import { NoteService } from "./notes/note.service";

bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	NoteService,
	AppModel
]);