import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Area = styled.div`
    width: 50px;
    height: 50px;
`;

const TrashBin = styled.div`
    width: 80px;
    height: 80px;
    background-image: url("/images/trash.png");
    background-size: cover;
    background-position: center;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
`;

function DroppableTrash(){
    return(
        <Area>
            <Droppable droppableId="trash">
                {(provided) => (
                    <TrashBin {...provided.droppableProps} ref={provided.innerRef} >
                        {provided.placeholder}
                    </TrashBin>
                )}
            </Droppable>
        </Area>
    );
}

export default DroppableTrash;