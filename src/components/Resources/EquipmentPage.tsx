import React from "react";

import { TableLogic } from "../TableLogic/TableLogic";
import { columns } from "./EquipmentColumns";
import { EquipmentData } from "./tempDataEquipment";

function EquipmentPage() {
    return <TableLogic columns={columns} data={EquipmentData} />;
}

export default EquipmentPage;
