import {PuffLoader} from "react-spinners";

export const CustomPuffLoader = () => {
    return <PuffLoader cssOverride={{zIndex: 100000000, position: "fixed", top: "50%", left: "50%"}} color="#EA5B0C"/>;
}