import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import DraggableCard from "./DraggableCard";

interface IBoardProps{
    toDos: string[];
    boardId: string;
}

interface IAreaProps{
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

const Board = styled.div`
    width: 300px;
	padding-top: 10px;
	padding: 20px 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 300px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px
`;

const Area = styled.div<IAreaProps>`
    background-color: ${(props) => props.isDraggingOver ? "#7FA1C3" : props.draggingFromThisWith ? "#EECAD5" : "#DADFE9"};
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
    flex-grow: 1;
`;


function DroppableBoard({toDos, boardId}: IBoardProps){
    return(
        <Board>
            <Title>{boardId}</Title>
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
                            <DraggableCard key={toDo} index={index} toDo={toDo}/>
                        ))}
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Board>
    );
}

export default DroppableBoard;