import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	max-width: 480px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
	padding-top: 30px;
	padding: 20px 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
`;

const Card = styled.div`
	border-radius: 5px;
	padding: 10px 10px;
	margin-bottom: 5px;
	background-color: ${(props) => props.theme.cardColor};
`;

const toDos = ['a', 'b', 'c', 'd', 'e'];

function App(){
	const onDragEnd = () => {

	}

	return(
		//필수: onDrageEnd(드래그를 놓을 때 발생하는 함수), children(<DragDropContext> 내부 코드. ex)<div>)
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{/*필수: droppableId(각 Droppable에 이름 붙이기), children(<Droppable> 내부 코드, 단 함수 형식어어야 한다.) */}
					<Droppable droppableId="one">
						{(provided) => (
						<Board {...provided.droppableProps} ref={provided.innerRef}>
							{/*필수: draggableId, index(정렬을 위한 순서), children*/}
							{toDos.map((toDo, index) => (
							<Draggable draggableId={toDo} index={index}>
								{(provided) => (
									<Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
										{toDo}
									</Card>
								)}
							</Draggable>
							))}
							{provided.placeholder}
						</Board>
						)}
					</Droppable>
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}

export default App;