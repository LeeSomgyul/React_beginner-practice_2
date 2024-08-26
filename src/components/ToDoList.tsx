import { useRecoilState, useRecoilValue } from "recoil";

import CreateToDo from "./CreatToDo";
import {toDoSelector, categoryState, Categoryies} from "../atom";
import ToDo from "./ToDo";


function ToDoList(){
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);

    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    return(
        <div>
            <h1>오늘의 할 일</h1>
            <hr/>
            <select value={category} onInput={onInput}>
                <option value={Categoryies.TO_DO}>To_Do</option>
                <option value={Categoryies.DOING}>Doing</option>
                <option value={Categoryies.DONE}>Done</option>
            </select>
            <CreateToDo/>
            {toDos?.map((toDo) => (<ToDo key={toDo.id} {...toDo}/>))}
        </div>
    );
}

export default ToDoList;