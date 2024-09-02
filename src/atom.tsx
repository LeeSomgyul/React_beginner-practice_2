import {atom} from "recoil";

export interface IToDoState {
    [key: string]: IToDo[];//toDosState의 각 키에 해당하는 값들은 IToDo와 같은 object형식이다(키값이 string이고 이에 대응하는 값이 string[]형태)
};

//[LocalStorage에서 값을 가져오는 함수]
const getLocalStorage = (key:string): IToDoState | null => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

//[LocalStorage에 값을 추가하는 함수]
export const setLocalStorage = (key:string, value: IToDoState) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export interface IToDo{
    id: number;
    text: string;
}

export const toDosState = atom<IToDoState>({
    key: "toDosState",
    default: {
        
    },
    effects: [
        ({setSelf, onSet}) => {
            const savedValue = getLocalStorage("toDosState");
            if(savedValue !== null){
                setSelf(savedValue);
            }
            onSet((newValue) => {
                setLocalStorage("toDosState", newValue);
            });
        }
    ]
});