import {atom, selector} from "recoil";

export const minuteState = atom({
    key: "minuteState",
    default: 0,
});

export const hourSelector = selector<number>({
    key: "hourSelector",
    get: ({get}) => {//atom값을 가져오는 get
        const minute = get(minuteState);
        return minute / 60;
    },
    set: ({set}, newValue) => {//atom값을 수정하는 set
        const minute = Number(newValue) * 60;
        set(minuteState, minute);//minute를 저장하는 minuteState의 default값을 minute값으로 변경
    },
});