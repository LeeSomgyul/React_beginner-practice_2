import React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
	border-radius: 5px;
	padding: 10px 10px;
	margin-bottom: 5px;
	background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCard {
    toDo: string;
    index: number;
}

function DraggableCard({toDo, index}: IDraggableCard){
    return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
		{(provided) => (
			<Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
				{toDo}
			</Card>
		)}
	</Draggable>
    );
}

//React.memo(react에게 해당 함수가 받는 인자가 변하지 않는다면 DraggableCard를 다시 렌더링 하지 말라고 하는 것.)
export default React.memo(DraggableCard);