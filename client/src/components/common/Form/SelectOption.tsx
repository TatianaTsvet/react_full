import { ReactNode } from "react"

export type TSelectOptionType = { 
    value?: string,
    children: ReactNode
}


export const SelectOption = ({ value, children }: TSelectOptionType) => {
    return <option value={value}>{children}</option>
}