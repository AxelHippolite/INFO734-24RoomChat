import {Columns, Heading, Section} from "react-bulma-components";
import {useEffect, useState} from "react";
import {CustomPuffLoader} from "../../components/customPuffLoader";
import {RoomsForms} from "../../components/rooms/roomsForm";
import {RoomsList} from "../../components/rooms/roomsList";
import {useRouter} from "next/router";
import axios from "axios";

function roomsViewed(response){
    const res = response.data;
    const data = []
    const roomCodes = [], roomNames = [];
    for(let i = 0; i < res.length; i++){roomCodes.push(res[i].roomCode); roomNames.push(res[i].roomName);}
    const codes = roomCodes.filter((item, index) => roomCodes.indexOf(item) === index);
    const names = roomNames.filter((item, index) => roomNames.indexOf(item) === index);
    for(let i = 0; i < names.length; i++){data.push({name: names[i], code: codes[i]});}
    return data;
}

const HomePage = ({showErrorMessage, showInfoMessage}) => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false), [roomsLoaded, setRoomsLoaded] = useState(false), [viewLoaded, setViewLoaded] = useState(false);
    const [userData, setUserData] = useState(null), [roomsData, setRoomsData] = useState(null), [viewData, setViewData] = useState(null);

    useEffect(() => {
        (async () => {
            if (!loaded && !roomsLoaded && !viewLoaded) {
                try {
                    let response = await axios.get("/api/session");
                    let roomsResponse = await axios.get("/api/rooms");
                    let viewResponse = await axios.get(`/api/roomsViewed/${response.data.userId}`);
                    let viewedData = roomsViewed(viewResponse);
                    setUserData(response.data);
                    setRoomsData(roomsResponse.data);
                    setViewData(viewedData);
                }
                catch (e) {
                    showErrorMessage("Information Not Retrieved", e.response.data);
                    setUserData(undefined);
                    setRoomsData(undefined);
                    setViewData(undefined);
                }

                setLoaded(true); setRoomsLoaded(true); setViewLoaded(true);
            }
        })()
    }, [loaded, roomsLoaded, viewLoaded]);

    if (!loaded || !roomsLoaded || !viewLoaded) {
        return <CustomPuffLoader/>
    }

    if (userData === undefined || roomsData === undefined || viewData === undefined) {
        router.replace("/");
        return null;
    }

    return (
        <Section>
            <Heading>Welcome {userData.username} !</Heading>
            <Columns>
                <Columns.Column className="is-one-third case">
                    <Heading className="has-text-danger">Rooms</Heading>
                    <RoomsList rooms={roomsData} router={router}/>
                </Columns.Column>
                <Columns.Column className="is-one-third case">
                    <Heading className="has-text-danger">Rooms Viewed</Heading>
                    <RoomsList rooms={viewData} router={router}/>
                </Columns.Column>
                <Columns.Column className="is-one-third case">
                    <Heading className="has-text-danger">Create A Room</Heading>
                    <RoomsForms showErrorMessage={showErrorMessage} showInfoMessage={showInfoMessage}/>
                </Columns.Column>
            </Columns>
        </Section>
    )
}

// On exporte la page
export default HomePage;