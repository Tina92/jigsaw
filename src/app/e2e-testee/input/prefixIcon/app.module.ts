import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputPrefixIconDemoComponent} from "./app.component";
@NgModule({
    declarations: [InputPrefixIconDemoComponent],
    bootstrap: [ InputPrefixIconDemoComponent ],
    imports: [JigsawInputModule]
})
export class InputPrefixIconDemoModule{

}
