import { ConfigProvider } from 'terminus-core'

export class ShellSelectorConfigProvider extends ConfigProvider {
    defaults = {
        hotkeys: {
            'shell-selector': [
                'Alt-N',
            ],
        },
    }

    platformDefaults = { }
}
