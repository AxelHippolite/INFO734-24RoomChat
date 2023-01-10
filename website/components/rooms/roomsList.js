import {Panel, Content} from "react-bulma-components";

function join(room, router){
    router.replace(`/room?id=${room.code}&name=${room.name}`);
}
export const RoomsList = ({rooms, router}) => {
    return (
        <Panel className="panel-heading has-text-danger">
            {rooms.map((room) => <Content onClick={() => {join(room, router)}}>{room.name} - {room.code}</Content>)}
        </Panel>
    )
}