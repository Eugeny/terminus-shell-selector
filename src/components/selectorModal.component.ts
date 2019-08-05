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
    shellFilter = '';
    filteredItems: Item[]
    selectedOption = 0

    constructor (
        public modalInstance: NgbActiveModal,
    ) { }

    ngOnInit() {
        this.filteredItems = this.items
    }

    onSearch() {
        this.filteredItems = Object.assign([], this.items).filter(
            item => item.name.toLowerCase().indexOf(this.shellFilter.toLowerCase()) > -1
        )
        this.selectedOption = 0
    }

    @HostListener(`document:keyup`, ['$event']) onKey ($event: KeyboardEvent) {
        if ($event.key >= '0' && $event.key <= '9') {
            let index = $event.key.charCodeAt(0) - '0'.charCodeAt(0)
            if (index < this.filteredItems.length) {
                this.modalInstance.close(this.filteredItems[index])
            }
        } else if ($event.key == 'Enter') {
            if (this.selectedOption < this.filteredItems.length) {
                this.modalInstance.close(this.filteredItems[this.selectedOption])
            }
        }
        else if ($event.key == 'ArrowDown' ) {
            if (this.selectedOption < this.filteredItems.length - 1) {
                this.selectedOption++
            }
        } else if ($event.key == 'ArrowUp') {
            if (this.selectedOption > 0) {
                this.selectedOption--
            }
        }
    }

    close () {
        this.modalInstance.dismiss()
    }
}
