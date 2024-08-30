import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import DraggableCard from "./DraggableCard";
import { IToDo, toDosState } from "../atom";
import { useSetRecoilState } from "recoil";

interface IAreaProps{
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

const Board = styled.div`
    width: 300px;
	padding-top: 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
    background-color: ${(props) => props.isDraggingOver ? "#7FA1C3" : props.draggingFromThisWith ? "#EECAD5" : "#DADFE9"};
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
    flex-grow: 1;
`;

const Form = styled.form`
    width: 100%;
    input{
        width: 100%;
    }
`;

interface IForm{
    toDo: string;
}

interface IBoardProps{
    toDos: IToDo[];
    boardId: string;
}


function DroppableBoard({toDos, boardId}: IBoardProps){
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const setToDos = useSetRecoilState(toDosState);
    const onSubmit = ({toDo}: IForm) => {
        const newToDo = {
            id: Date.now(),//중복되지 않을만한 값으로 id 랜덤 생성
            text: toDo,
        };
        //atom의 값을 변경할때는 변경된 것만 수정하는것이 아니라 기존의 값들도 다시 등록해주어야 한다.
        setToDos((allToDos) => {
            return{
                ...allToDos,//기존 값들
                [boardId]: [newToDo, ...allToDos[boardId]],//새로 추가된 값(키:값 형식)
            };
        });
        setValue("toDo", "");//input 비워주기
    };

    return(
        <Board>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("toDo", {required: true})} type="text"  placeholder={`${boardId}에 추가할 내용을 작성해주세요.`}/>
            </Form>
            {/*필수: droppableId(각 Droppable에 이름 붙이기), children(<Droppable> 내부 코드, 단 함수 형식어어야 한다.)*/}
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                    <Area 
                    {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                    >
                        {/*필수: draggableId, index(정렬을 위한 순서), children*/}
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text}/>
                        ))}
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Board>
    );
}

export default DroppableBoard;