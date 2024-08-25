import {atom} from "recoil";

export interface IToDo {
    id: number;
    text: string;
    category: "TO_DO" | "DOING" | "DONE";//category는 3가지 string만 가능
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});