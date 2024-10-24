import { ReactNode } from "react"

export const SelectOption = ({ value, children }: { value?: string | number, children: ReactNode}) => {
    return <option value={value}>{children}</option>
}