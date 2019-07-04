import { Component, Input, HostListener } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Shell, Profile } from 'terminus-terminal'

export interface Item {
    name: string
    shell?: Shell
    profile?: Profile
}
@Component({
    template: require('./selectorModal.component.pug'),
})
export class SelectorModalComponent {
    @Input() items: Item[]

    constructor (
        public modalInstance: NgbActiveModal,
    ) { }

    @HostListener(`document:keyup`, ['$event']) onKey ($event: KeyboardEvent) {
        if ($event.key >= '0' && $event.key <= '9') {
            let index = $event.key.charCodeAt(0) - '0'.charCodeAt(0)
            this.modalInstance.close(this.items[index])
        }
    }

    close () {
        this.modalInstance.dismiss()
    }
}
