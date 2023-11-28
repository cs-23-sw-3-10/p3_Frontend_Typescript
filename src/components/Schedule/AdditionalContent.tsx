import { useState } from "react";
import BladeTaskMenu from "../CreateBTMenu/BladeTaskMenu";

function CreateAdditionalContent() {
    const [isShown, setIsShown] = useState(false);

    return (
        <>
        {isShown ? <BladeTaskMenu/> : <></>}
        <button onClick={() => setIsShown(!isShown)}>BT-MENU</button>
        </>
    );
}
export default CreateAdditionalContent;
