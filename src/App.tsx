import {DropResult, DragDropContext} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import {toDosState} from "./atom";
import DroppableBoard from "./components/DroppableBoard";

const Wrapper = styled.div`
	display: flex;
	max-width: 680px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	gap: 10px;
	grid-template-columns: repeat(3, 1fr);
`;


function App(){
	const [ toDos, setToDos] = useRecoilState(toDosState);
	//[이동하려는 대상을 놓았을 때 실행되는 함수]
	const onDragEnd = (result: DropResult) => {
		//draggableId(이동하는 대상), destination(이동 목적지), source(대상의 원래 위치)
		const {draggableId, destination, source} = result;
		//1. 이동 대상 도착지가 없는경우(대상을 원래 자리에 놓은 경우 등...)
		if(!destination?.droppableId) return;
		//2. 이동 대상의 출발 Board와 목적지 Board가 같은 경우
		if(source.droppableId === destination?.droppableId){
			setToDos((allBoards) => {
				const boardCopy = [...allBoards[source.droppableId]];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, draggableId);
				return{
					...allBoards,
					[source.droppableId]: boardCopy,
				};
			});
		}
		//3. 이동 대상의 출발 Board와 목적지 Board가 다른 경우
		if(source.droppableId !== destination?.droppableId){
			setToDos((allBoards) => {
				const sourceBoardCopy = [...allBoards[source.droppableId]];
				const destinationBoardCopy = [...allBoards[destination.droppableId]];
				sourceBoardCopy.splice(source.index, 1);
				destinationBoardCopy.splice(destination?.index, 0, draggableId);
				return{
					...allBoards,
					[source.droppableId]: sourceBoardCopy,
					[destination?.droppableId]: destinationBoardCopy,
				};
			});
		}
	}
	
	return(
		//필수: onDrageEnd(드래그를 놓을 때 발생하는 함수), children(<DragDropContext> 내부 코드. ex)<div>)
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map((boardId) => (<DroppableBoard key={boardId} boardId={boardId} toDos={toDos[boardId]}/>))}
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
};

export default App;