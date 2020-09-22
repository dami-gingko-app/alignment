import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {EnterSequenceComponent} from './enter-sequence/enter-sequence.component';
import {ResultListComponent} from './result-list/result-list.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {path: '', component: ResultListComponent},
        ]),
        FormsModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
        EnterSequenceComponent,
        ResultListComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
