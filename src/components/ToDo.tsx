import {useSetRecoilState } from "recoil";
import {toDoState, IToDo, Categoryies} from "../atom";

function ToDo({ id, text, category}: IToDo){
    const setToDose = useSetRecoilState(toDoState);
    //category 변경 이벤트
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) =>{
        const newCategory = event.currentTarget.name;
        setToDose((oldToDos) => {
            const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);//oldToDo.id(기존 저장되어있는 todo의 각 id), id(클릭버튼을 누른 대상 todo의 id)의 index를 맞춰 대상을 찾는다.
            const newToDo = {id, text, category: newCategory as any};//category만 변경
            return [
                //category를 변경하고자 하는 target의 [앞 배열 todo, target todo, 뒤 배열 todo]
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex+1)];
        });
    };
    return(
        <li>
            <span>{text}</span>
            {category !== Categoryies.TO_DO && <button name={Categoryies.TO_DO} onClick={onClick}>할일</button>} 
            {category !== Categoryies.DOING && <button name={Categoryies.DOING} onClick={onClick}>진행중</button>}
            {category !== Categoryies.DONE && <button name={Categoryies.DONE} onClick={onClick}>완료</button>}
        </li>
    );
}

export default ToDo;