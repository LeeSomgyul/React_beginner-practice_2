import {DropResult, DragDropContext} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import {toDosState} from "./atom";
import DroppableBoard from "./components/DroppableBoard";
import DroppableTrash from "./components/DroppableTrash";

const Wrapper = styled.div`
	display: flex;
	width: 100vw;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	gap: 10px;
`;


function App(){
	const [ toDos, setToDos] = useRecoilState(toDosState);
	//[이동하려는 대상을 놓았을 때 실행되는 함수]
	const onDragEnd = (result: DropResult) => {
		//draggableId(이동하는 대상), destination(이동 목적지), source(대상의 원래 위치)
		const {destination, source} = result;
		//1. 이동 대상 도착지가 없는경우(대상을 원래 자리에 놓은 경우 등...)
		if(!destination?.droppableId) return;
		//2. 폴더삭제 이미지로 드래그한 경우
		if(destination && destination.droppableId === "trash"){
			setToDos((allBoards) => {
				const sourceBoardCopy = [...allBoards[source.droppableId]];
				sourceBoardCopy.splice(source.index, 1);
				return{
					...allBoards,
					[source.droppableId]: sourceBoardCopy,
				}
			})
			return;//삭제는 card가 이동하는 destination이 없기때문에 함수를 종료해줘야한다
		}
		//4. 이동 대상의 출발 Board와 목적지 Board가 같은 경우
		if(source.droppableId === destination?.droppableId){
			setToDos((allBoards) => {
				const boardCopy = [...allBoards[source.droppableId]];//ex) "To_Do"의 [{id:1, text:"hello"}, {id:2, text:"bye"}]
				const taskObj = boardCopy[source.index];//ex) index=0 이라면 [{id:1, text:"hello"}, {id:2, text:"bye"}]의 {id:1, text:"hello"}
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, taskObj);
				return{
					...allBoards,
					[source.droppableId]: boardCopy,
				};
			});
		}
		//5. 이동 대상의 출발 Board와 목적지 Board가 다른 경우
		if(source.droppableId !== destination?.droppableId){
			setToDos((allBoards) => {
				const sourceBoardCopy = [...allBoards[source.droppableId]];
				const sourceBoardObj = sourceBoardCopy[source.index];
				const destinationBoardCopy = [...allBoards[destination.droppableId]];
				sourceBoardCopy.splice(source.index, 1);
				destinationBoardCopy.splice(destination?.index, 0, sourceBoardObj);
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
			<DroppableTrash/>
		</DragDropContext>
	);
};

export default App;