import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToolbarButtonProvider, ConfigProvider, HotkeyProvider } from 'terminus-core'
import { ButtonProvider } from './buttonProvider'
import { SelectorModalComponent } from './components/selectorModal.component'
import { ShellSelectorConfigProvider } from './config'
import { ShellSelectorHotkeyProvider } from './hotkeys'

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
    ],
    providers: [
        { provide: ToolbarButtonProvider, useClass: ButtonProvider, multi: true },
        { provide: ConfigProvider, useClass: ShellSelectorConfigProvider, multi: true },
        { provide: HotkeyProvider, useClass: ShellSelectorHotkeyProvider, multi: true },
    ],
    entryComponents: [
        SelectorModalComponent,
    ],
    declarations: [
        SelectorModalComponent,
    ],
})
export default class ShellSelectorModule { }
