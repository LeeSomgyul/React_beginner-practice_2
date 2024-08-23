import { useState } from "react";

function ToDoList(){
    const [toDo, setToDo] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setToDo(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(toDo);
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} placeholder="오늘의 할 일"/>
                <button>추가</button>
            </form>
        </div>
    );
}

export default ToDoList;