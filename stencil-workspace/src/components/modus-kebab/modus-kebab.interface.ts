export interface KebabOptions {
    name: string
    func: (event: MouseEvent | KeyboardEvent) => void
    disabled?: boolean
}

export type KebabPosition = 'left' | 'right'