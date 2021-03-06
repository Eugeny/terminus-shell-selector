import { AsyncSubject } from 'rxjs'
import { first } from 'rxjs/operators'
import { Injectable, Inject } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { HotkeysService, ToolbarButtonProvider, ToolbarButton, ConfigService } from 'terminus-core'
import { Shell, ShellProvider, TerminalService } from 'terminus-terminal'
import { SelectorModalComponent, Item } from './components/selectorModal.component'

@Injectable()
export class ButtonProvider extends ToolbarButtonProvider {
    private shells$ = new AsyncSubject<Shell[]>()

    constructor (
        private terminal: TerminalService,
        private config: ConfigService,
        private ngbModal: NgbModal,
        @Inject(ShellProvider) shellProviders: ShellProvider[],
        hotkeys: HotkeysService,
    ) {
        super()
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
        this.shells$.pipe(first()).subscribe(shells => {
            let modal = this.ngbModal.open(SelectorModalComponent)
            modal.componentInstance.items = [
                ...this.config.store.terminal.profiles.map(profile => ({ profile, name: profile.name })),
                ...shells.map(shell => ({ shell, name: shell.name })),
            ]
            modal.result.then((item: Item) => {
                if (item.shell) {
                    this.terminal.openTabWithOptions(this.terminal.optionsFromShell(item.shell))
                }
                if (item.profile) {
                    this.terminal.openTabWithOptions(item.profile.sessionOptions)
                }
            })
        })
    }

    provide (): ToolbarButton[] {
        return [{
            icon: require('./icons/list.svg'),
            weight: 5,
            title: 'Select shell',
            touchBarNSImage: 'NSTouchBarIconViewTemplate',
            click: async () => {
                this.activate()
            }
        }]
    }
}
