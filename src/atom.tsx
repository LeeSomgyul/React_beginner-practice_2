import {atom, selector} from "recoil";

//enum: 어디서든 값을 쓸 수 있게끔 해준다. 값을 숫자로 저장("TO_DO" = 0)하기 때문에 stirng으로 저장을 원한다면 아래와 같이 작성해야한다.
export enum Categoryies {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

export interface IToDo {
    id: number;
    text: string;
    category: Categoryies;//category는 3가지 string만 가능
}

export const categoryState = atom<Categoryies>({
    key: "category",
    default: Categoryies.TO_DO,//기본값은 "TO_DO"
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

//category별 todo 분류작업
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});
