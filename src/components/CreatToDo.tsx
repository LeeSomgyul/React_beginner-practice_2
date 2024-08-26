import {useForm} from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState, categoryState } from "../atom";

interface IForm{
    toDo: string;
}

function CreateToDo(){
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValid = (data: IForm) => {
        setToDos((oldToDos) => [{id: Date.now(), text: data.toDo, category: category}, ...oldToDos]);//새로운todo + 기존todo를 각각의 배열 요소로 반환
        setValue("toDo", "");//제출하면 input비우기
    };

    return(
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {
                required: "작성해주세요.",
            })} placeholder="오늘의 할 일."/>
            <button>추가</button>
        </form>
    );
}

export default CreateToDo;