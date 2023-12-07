import { GET_ALL_BLADE_PROJECTS} from '../../api/queryList';
import { useQuery } from '@apollo/client';


function ProjectSelector({bladeProjectId,setBladeProjectId}:{bladeProjectId:string,setBladeProjectId:Function}) {
    const { loading, error, data } = useQuery(GET_ALL_BLADE_PROJECTS, {
        variables: { isActive: true },
    });

    //Whilst list is loading, the only element in the list is "LOADING"
    if (loading) return (<option value="LOADING">LOADING</option>);

    //Error returns an empty list
    if (error) {
        return (<option value="LOADING">ERROR</option>);
    }
    
    //Set the default state to be the first option -> Only happens on initial render
    if(bladeProjectId === ""){
        setBladeProjectId(data.AllBladeProjects[0].id);
    }

    return (
        <div className='project_selection_wrapper'>
            <h2 className="title">Blade Project</h2>
            <select className="input_sideborders" id="blade_project" name="blade_project" onChange={(e) => setBladeProjectId(e.currentTarget.value)} value={bladeProjectId}>
                <BladeProjectOptions AllBladeProjects={data.AllBladeProjects}/>
            </select>
        </div>
        
    );
}

//Queries test types and insert them into the BT-Menu
function BladeProjectOptions({AllBladeProjects}:{AllBladeProjects:{id:string, projectName:string, customer:string}[]}) {
    //Returns a dropdown of all the testrigs present in DB
    return <>{AllBladeProjects.map((BladeProject) => (<option value={BladeProject.id} key={BladeProject.id}>{BladeProject.projectName}{"("}{BladeProject.customer}{")"}</option>))}</>
}

export default ProjectSelector;