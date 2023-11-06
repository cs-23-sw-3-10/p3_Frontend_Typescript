import React from "react";
import { Button } from "../ui/button";
import { ProjectDataTable } from "./dataTable";
import { columns } from "./BPProjectsColumns";
import { BladeProjectData } from "./tempData";

function ProjectTable() {
    return <ProjectDataTable columns={columns} data={BladeProjectData} />;
}

export default ProjectTable;
