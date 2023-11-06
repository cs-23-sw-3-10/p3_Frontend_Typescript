import React from "react";
import { Button } from "../ui/button";
import { TableLogic } from "../TableLogic/TableLogic";
import { columns } from "./BPProjectsColumns";
import { BladeProjectData } from "./tempData";

function ProjectTable() {
    return <TableLogic columns={columns} data={BladeProjectData} />;
}

export default ProjectTable;
