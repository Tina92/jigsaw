import { NgModule } from '@angular/core';
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawTabsModule } from "jigsaw/component/tabs/index";
import { JigsawShowTabComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTabsModule, JigsawButtonModule ],
    declarations: [ JigsawShowTabComponent ],
    bootstrap: [ JigsawShowTabComponent ]
})
export class TabsShowTabDemoModule {}
