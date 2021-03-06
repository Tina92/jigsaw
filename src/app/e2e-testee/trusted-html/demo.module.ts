import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TrustedHtmlFullComponent} from "../../live-demo/trusted-html/full/app.component";
import {TrustedHtmlFullModule} from "../../live-demo/trusted-html/full/app.module";

const routes=[
    {
        path:'full', component: TrustedHtmlFullComponent
    },
    {
        path:'**', //fallback router must in the last
        component: TrustedHtmlFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), TrustedHtmlFullModule,
    ],
    exports: [
    ],
    providers: []
})
export class TrustedHtmlDemoModule { }
