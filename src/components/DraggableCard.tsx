import React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

interface ICardProps{
	isDragging: boolean;
	putUpTrash: boolean;
}

const Card = styled.div<ICardProps>`
	border-radius: 5px;
	padding: 7px 5px;
	font-size: 14px;
	font-weight: 600;
	margin: 5px 10px;
	background-color: ${(props) => props.putUpTrash ? "#C80036" : props.isDragging ? "#D1E9F6" : props.theme.cardColor};
	box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

interface IDraggableCard {
    index: number;
	toDoId: number;
	toDoText: string;
	putUpTrash: boolean;
}

function DraggableCard({index, toDoId, toDoText, putUpTrash}: IDraggableCard){
    return (
    <Draggable draggableId={toDoId + ""} index={index}>
		{(provided, snapshot) => (
			<Card
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				isDragging={snapshot.isDragging}
				putUpTrash={putUpTrash}
			>
				{toDoText}
			</Card>
		)}
	</Draggable>
    );
}

//React.memo(react에게 해당 함수가 받는 인자가 변하지 않는다면 DraggableCard를 다시 렌더링 하지 말라고 하는 것.)
export default React.memo(DraggableCard);