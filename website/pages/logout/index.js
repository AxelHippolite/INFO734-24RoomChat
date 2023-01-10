import {useEffect} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import {CustomPuffLoader} from "../../components/customPuffLoader";

const LogoutPage = ({showErrorMessage, showSuccessMessage}) => {
    useEffect(() => {
        document.title = "LogOut";
    });

    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                await axios.delete("/api/logout");
                showSuccessMessage("Disconnection", "Succeed");
            } catch (e) {
            }
            router.push("/");
        })()
    }, []);
    return <CustomPuffLoader/>;
}

export default LogoutPage;