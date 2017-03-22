import {
    NgModule, Component, ContentChildren, QueryList, AfterContentInit, Input, forwardRef, Optional, Renderer, OnDestroy,
    OnInit, Output, EventEmitter, ChangeDetectorRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AbstractRDKComponent} from '../../core/api/component-api';
import {CommonUtils} from '../../core/utils/common-utils';
import {InternalUtils} from '../../core/utils/internal-utils';

@Component({
    selector: 'rdk-select',
    templateUrl: 'select.html',
    styleUrls: ['select.scss'],
    host: {
        "(click)": "_toggleClick($event)",
        '[style.width]': 'width',
        '[style.height.px]': 'height',
        '[style.line-height.px]': 'height'
    }
})
export class SelectComponent extends AbstractRDKComponent implements AfterContentInit, OnDestroy, OnInit {
    private _optionListHidden: boolean = true; // 设置option列表是否显示
    private _value: any; // select表单值
    private _contentInit: boolean = false; //子组件加载标记
    private _documentListen: Function; // document事件解绑函数
    private _selectedLabel: string;

    //select form表单值
    @Input()
    public get value(): any {
        return this._value;
    }

    public set value(newValue: any) {
        if (this._value != newValue) {
            this._value = newValue;
            this._selectedLabel = newValue[this.labelField];
            this._contentInit && this._updateSelectedOption();
        }
    }

    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    //设置对象的标识
    @Input() public trackItemBy: any;

    //显示在界面上的属性名
    @Input() public labelField: string = 'label';

    @Input() public placeholder: string;

    //获取映射的子组件option
    @ContentChildren(forwardRef(() => OptionComponent))
    private _options: QueryList<OptionComponent> = null;

    constructor(private _renderer: Renderer) {
        super()
    }

    //点击组件，显示\隐藏option列表
    private _toggleClick(event: Event): void {
        event.stopPropagation();
        this._optionListHidden = !this._optionListHidden;
        if (this._optionListHidden) {
            this._documentListen();
        } else {
            this._documentListen = this._renderer.listenGlobal('document', 'click', () => this._optionListHidden = true);
        }
    }

    //更改option选中状态
    private _updateSelectedOption(): void {
        this._options && this._options.forEach((option) => {
            option.selected = CommonUtils.compareWithKeyProperty(this.value, option.optionItem, this.trackItemBy);
            option.cdRef.detectChanges();
        });
        this.valueChange.emit(this.value);
    };

    ngOnInit() {
        this.trackItemBy = InternalUtils.initTrackItemBy(this.trackItemBy, this.labelField);
    }

    ngAfterContentInit() {
        this._contentInit = true;
        this._updateSelectedOption();
    }

    ngOnDestroy() {
        this._documentListen();//解绑document上的点击事件
    }

}

@Component({
    selector: 'rdk-select-option',
    templateUrl: 'option.html',
    styleUrls: ['option.scss'],
    host: {
        "(click)": "_onClick()",
        '[style.height]': '_height',
        '[style.line-height]': '_height'
    }
})
export class OptionComponent implements OnInit {
    @Input() public optionItem: any;

    private _optionLabel: string;

    private _selectCmp: SelectComponent;

    private _height: string;

    public selected: boolean = false;//选中状态

    constructor(@Optional() selectCmp: SelectComponent, public cdRef: ChangeDetectorRef) {
        this._selectCmp = selectCmp;
    }

    private _onClick(): void {
        if (!this.selected) {
            this.selected = true;
            if (this._selectCmp) {
                this._selectCmp.value = this.optionItem;//更新内部value
            }
        }
    }

    ngOnInit() {
        //初始化option显示值
        this._optionLabel = this.optionItem[this._selectCmp.labelField];
        this._selectCmp.height ? this._height = this._selectCmp.height : null;
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [SelectComponent, OptionComponent],
    exports: [SelectComponent, OptionComponent]
})
export class SelectModule {

}