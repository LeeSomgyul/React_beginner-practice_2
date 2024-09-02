import { useState } from "react";
import {DropResult, DragDropContext} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { set, useForm } from "react-hook-form";

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

const AddBoardButton = styled.div`
	width: 80px;
	height: 80px;
	background-image: url("/images/add.png");
	background-size: cover;
	background-position: center;
	position: fixed;
	top: 10px;
	left: 10px;
	cursor: pointer;
`;

const FormWrapper = styled.div`
	background-color: white;
	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 20px;
`;

const Input = styled.input`
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
`;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: #007bff;
	color: white;
	border: none;
	cursor: pointer;
`;

interface IFormInput{
	boarderName: string;
}

function App(){
	const [ toDos, setToDos] = useRecoilState(toDosState);
	const [ putUpTrash, setPutUpTrash ] = useState(false);//휴지통 위에 있는지 여부
	const [ watchAddInput, setwatchAddInput ] = useState(false);
	const { register, handleSubmit, setValue } = useForm<IFormInput>();
	
	//[이동하려는 대상을 놓았을 때 실행되는 함수]
	const onDragEnd = (result: DropResult) => {
		setPutUpTrash(false);
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
	
	const onDragUpdate = (update: any) => {
		const {destination} = update;
		if(destination?.droppableId === "trash"){
			setPutUpTrash(true);
		}else{
			setPutUpTrash(false);
		}
	}

	const addBoard = ({boarderName}:IFormInput) => {
		const newBoard = {
			[boarderName]: [],
		};

		setToDos((allBoards) => {
			if(Object.keys(allBoards).length >= 3){
				alert("최대 3개까지 만들 수 있습니다.");
				return allBoards;
			}
			if(allBoards[boarderName]){
				alert("이미 존재하는 보드 이름입니다.");
				return allBoards;
			}
			return{
				...allBoards,
				...newBoard,
			};
		});
		setValue("boarderName", "");
		setwatchAddInput(false);

	}

	
	return(
		//필수: onDrageEnd(드래그를 놓을 때 발생하는 함수), children(<DragDropContext> 내부 코드. ex)<div>)
		<DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
			{watchAddInput && (
				<FormWrapper>
					<form onSubmit={handleSubmit(addBoard)}>
						<Input
							{...register("boarderName", {required: "보드 이름을 입력해주세요."})}
							placeholder="보드 이름을 입력해주세요."
							type="text"
						/>
						<Button type="submit">추가</Button>
					</form>
				</FormWrapper>
			)}
			<AddBoardButton onClick={() => setwatchAddInput(true)}/>
			<DroppableTrash/>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map((boardId) => (
						<DroppableBoard key={boardId} boardId={boardId} toDos={toDos[boardId]} putUpTrash={putUpTrash}/>
					))}
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
};

export default App;