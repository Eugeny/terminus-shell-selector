import { AsyncSubject } from 'rxjs'
import { Injectable, Inject } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { HotkeysService, ToolbarButtonProvider, IToolbarButton, Logger, LogService } from 'terminus-core'
import { IShell, ShellProvider, TerminalService } from 'terminus-terminal'
import { SelectorModalComponent } from './components/selectorModal.component'

@Injectable()
export class ButtonProvider extends ToolbarButtonProvider {
    private shells$ = new AsyncSubject<IShell[]>()
    private logger: Logger

    constructor (
        private terminal: TerminalService,
        private ngbModal: NgbModal,
        log: LogService,
        @Inject(ShellProvider) shellProviders: ShellProvider[],
        hotkeys: HotkeysService,
    ) {
        super()
        this.logger = log.create('shellSelectorButton')
        Promise.all(shellProviders.map(x => x.provide())).then(shellLists => {
            this.shells$.next(shellLists.reduce((a, b) => a.concat(b)))
            this.shells$.complete()
        })
        hotkeys.matchedHotkey.subscribe(async (hotkey) => {
            if (hotkey === 'shell-selector') {
                this.activate()
            }
        })
    }

    activate () {
        this.shells$.first().subscribe(shells => {
            let modal = this.ngbModal.open(SelectorModalComponent)
            modal.componentInstance.shells = shells
            modal.result.then(shell => {
                this.terminal.openTab(shell)
            })
        })
    }

    provide (): IToolbarButton[] {
        return [{
            icon: 'th-large',
            weight: 5,
            title: 'Select shell',
            click: async () => {
                this.activate()
            }
        }]
    }
}
