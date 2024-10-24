import { memo } from "react";
import { SelectOption } from "./SelectOption";
import { ReactNode } from "react";


type TSelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
    onChange: (val: string) => void,
    placeholder?: string | null,
    options: { value: string, label: ReactNode }[]
}

export const Select = memo(({
    onChange,
    id = '',
    placeholder = 'Choose option',
    options = [],
    ...props
}: TSelectProps) => {
    return (
        <select
            {...props}
            className="form-select"
            id={id}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
            
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.length > 0 && (
                options.map((option) => {
                    return (
                        <SelectOption
                            key={option.value}
                            value={option.value}
                            >
                             {option.label}
                        </SelectOption>
                    )
                })
            )}           
          </select>
    )
})