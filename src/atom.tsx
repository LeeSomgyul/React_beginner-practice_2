import {atom} from "recoil";

export interface IToDo{
    id: number;
    text: string;
}

//키값이 string이고 이에 대응하는 값이 string[]형태
interface IToDoState {
    [key: string]: IToDo[];//toDosState의 각 키에 해당하는 값들은 IToDo와 같은 object형식이다
}

export const toDosState = atom<IToDoState>({
    key: "toDosState",
    default: {
        "TO_DO": [],//_가 있는 경우 키값이 문자열로 인식되지 않아 ""를 직접 붙여주어야 한다
        DOING: [],
        DONE: [],
    }
});