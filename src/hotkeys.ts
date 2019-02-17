import { Injectable } from '@angular/core'
import { IHotkeyDescription, HotkeyProvider } from 'terminus-core'

@Injectable()
export class ShellSelectorHotkeyProvider extends HotkeyProvider {
    hotkeys: IHotkeyDescription[] = [
        {
            id: 'shell-selector',
            name: 'Show shell selector',
        },
    ]

    async provide (): Promise<IHotkeyDescription[]> {
        return this.hotkeys
    }
}
