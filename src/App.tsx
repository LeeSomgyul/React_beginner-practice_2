import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import {toDosState} from "./atom";
import DraggableCard from "./components/DraggableCard";

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




function App(){
	const [ toDos, setToDos] = useRecoilState(toDosState);
	//[이동하려는 대상을 놓았을 때 실행되는 함수]
	const onDragEnd = (result: DropResult) => {
		//draggableId(이동하는 대상), destination(이동 목적지), source(대상의 원래 위치)
		const {draggableId, destination, source} = result;
		//만약 동일한 위치로 드래그하거나 목적지가 없는 경우 아무것도 하지 않음
		if(!destination) return;
		setToDos((currentToDos) => {//setToDose에서 받는 인자는 현재 값(toDos)을 불러온다
			const toDos = [...currentToDos];//전체 배열 불러오기
			toDos.splice(source.index, 1);//이동 대상을 원래 위치에서 삭제
			toDos.splice(destination?.index, 0, draggableId);//이동 대상을 새로운 위치에 추가
			return toDos;
		});
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
								<DraggableCard key={toDo} index={index} toDo={toDo}/>
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