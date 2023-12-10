import BPMenu from "../CreateBPMenu/BPMenu";

interface EditBPComponentProps {
    choosenBP: any;
    deleteBProject: Function;
    Id: number;
    popUpClass: string;
}

function EditBPComponent(props: EditBPComponentProps) {
    return (
        <>
            <BPMenu creator={false} BPId={String(props.choosenBP)} popUpClass={props.popUpClass} />
            <button onClick={() => props.deleteBProject(props.Id, false)}>Delete</button>
        </>
    );
}
export default EditBPComponent;
