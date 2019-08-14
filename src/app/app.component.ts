import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public apiUrl: string;
    public APP_NAME = `${environment.appName}`;
    public NODE_ENV = `${environment.nodeEnv}`;
    private BASE_CLIENT_URL = `${environment.apiBaseUrl}/api/`;

    public ngOnInit(): void {
        this.apiUrl = this.BASE_CLIENT_URL + 'comparison';
    }
}
