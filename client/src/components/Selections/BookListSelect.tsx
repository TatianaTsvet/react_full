import { useSelector } from "react-redux";
import type { StateType } from "../../reducers/reducer";
import { memo } from "react";
import { Select } from "../common";



export const BookListSelect = memo(({
    onSelect,
    id = ''
}: {
    onSelect: (value: string) => void,
    id: string
}) => {
    const books = useSelector((state: StateType) => state.books
        .filter((book) => !!book._id)
        .map((book) => {
        return {
            value: book._id as string,
            label: `${book.title} by ${book.author}`
        }
    }))



    return <Select
        id={id}
        onChange={(value) => onSelect(value)}
        options={books}
    />
})