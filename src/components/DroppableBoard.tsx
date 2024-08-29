import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import DraggableCard from "./DraggableCard";

const Board = styled.div`
    width: 300px;
	padding-top: 10px;
	padding: 20px 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 300px;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px
`;

interface IBoardProps{
    toDos: string[];
    boardId: string;
}

function DroppableBoard({toDos, boardId}: IBoardProps){
    return(
        <Board>
            <Title>{boardId}</Title>
            {/*필수: droppableId(각 Droppable에 이름 붙이기), children(<Droppable> 내부 코드, 단 함수 형식어어야 한다.)*/}
            <Droppable droppableId={boardId}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {/*필수: draggableId, index(정렬을 위한 순서), children*/}
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo} index={index} toDo={toDo}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Board>
    );
}

export default DroppableBoard;