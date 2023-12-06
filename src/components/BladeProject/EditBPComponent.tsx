import BPMenu from "../CreateBPMenu/BPMenu";

interface EditBPComponentProps {
    choosenBP: any;
    deleteBProject: Function;
    Id: number;
}

function EditBPComponent(props: EditBPComponentProps) {
    console.log("edit component ", props.choosenBP);
    return <>
        <BPMenu creator={false} BPId={props.choosenBP} />
        <button onClick={() => props.deleteBProject(props.Id, false)}>Delete</button>
    </>;
}
export default EditBPComponent;