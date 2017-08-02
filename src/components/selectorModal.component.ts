import { Component, Input, HostListener } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { IShell } from 'terminus-terminal'

@Component({
    template: require('./selectorModal.component.pug'),
    //styles: [require('./selectorModal.component.scss')],
})
export class SelectorModalComponent {
    @Input() shells: IShell[]

    constructor (
        public modalInstance: NgbActiveModal,
    ) { }

    @HostListener(`document:keyup`, ['$event']) onKey ($event: KeyboardEvent) {
        if ($event.key >= '0' && $event.key <= '9') {
            let index = $event.key.charCodeAt(0) - '0'.charCodeAt(0)
            this.modalInstance.close(this.shells[index])
        }
    }

    close () {
        this.modalInstance.dismiss()
    }
}
