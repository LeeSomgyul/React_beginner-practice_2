import {atom} from "recoil";

//키값이 string이고 이에 대응하는 값이 string[]형태
interface IToDoState {
    [key: string]: string[];
}

export const toDosState = atom<IToDoState>({
    key: "toDosState",
    default: {
        "TO_DO": ['a', 'b'],//_가 있는 경우 키값이 문자열로 인식되지 않아 ""를 직접 붙여주어야 한다
        DOING: ['c','d'],
        DONE: ['e'],
    }
});