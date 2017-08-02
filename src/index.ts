import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToolbarButtonProvider, ConfigProvider } from 'terminus-core'
import { ButtonProvider } from './buttonProvider'
import { SelectorModalComponent } from './components/selectorModal.component'
import { ShellSelectorConfigProvider } from './config'

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
    ],
    providers: [
        { provide: ToolbarButtonProvider, useClass: ButtonProvider, multi: true },
        { provide: ConfigProvider, useClass: ShellSelectorConfigProvider, multi: true },
    ],
    entryComponents: [
        SelectorModalComponent,
    ],
    declarations: [
        SelectorModalComponent,
    ],
})
export default class ShellSelectorModule { }
