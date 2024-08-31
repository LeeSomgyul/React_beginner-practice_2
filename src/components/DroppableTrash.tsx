import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const TrashBin = styled.div`
    width: 80px;
    height: 80px;
    background-image: url("/images/trash.png");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 1000;
`;

function DroppableTrash(){
    return(
        <Droppable droppableId="trash">
            {(provided) => (
                <TrashBin {...provided.droppableProps} ref={provided.innerRef}>
                    {provided.placeholder}
                </TrashBin>
            )}
        </Droppable>
    );
}

export default DroppableTrash;