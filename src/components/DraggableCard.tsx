import React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

interface ICardProps{
	isDragging: boolean;
}

const Card = styled.div<ICardProps>`
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 5px;
	background-color: ${(props) => props.isDragging ? "#D1E9F6" : props.theme.cardColor};
	box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDraggableCard {
    index: number;
	toDoId: number;
	toDoText: string;
}

function DraggableCard({index, toDoId, toDoText}: IDraggableCard){
    return (
    <Draggable draggableId={toDoId + ""} index={index}>
		{(provided, snapshot) => (
			<Card
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				isDragging={snapshot.isDragging}
			>
				{toDoText}
			</Card>
		)}
	</Draggable>
    );
}

//React.memo(react에게 해당 함수가 받는 인자가 변하지 않는다면 DraggableCard를 다시 렌더링 하지 말라고 하는 것.)
export default React.memo(DraggableCard);