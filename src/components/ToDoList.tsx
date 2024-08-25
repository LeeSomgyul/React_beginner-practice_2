import { useRecoilValue } from "recoil";

import CreateToDo from "./CreatToDo";
import ToDo from "./ToDo";
import {toDoState} from "../atom";


function ToDoList(){
    const todos = useRecoilValue(toDoState);
    return(
        <div>
            <h1>오늘의 할 일</h1>
            <hr/>
            <CreateToDo/>
            <ul>
                {todos.map((toDo) => <ToDo key={toDo.id} id={toDo.id} text={toDo.text} category={toDo.category}/>)}
            </ul>
        </div>
    );
}

export default ToDoList;