import { GET_ALL_BLADE_PROJECTS} from '../../api/queryList';
import { useQuery } from '@apollo/client';


function ProjectSelector({setProject}:{setProject:Function}) {
    return (
        <div className='project_selection_wrapper'>
            <h2 className="title">Blade Project</h2>
            <select id="blade_project" name="blade_project" onChange={(e) => setProject(e.currentTarget.value)}>;
                <BladeProjectOptions/>
            </select>
        </div>
        
    );
}

//Queries test types and insert them into the BT-Menu
function BladeProjectOptions() {
    const { loading, error, data } = useQuery(GET_ALL_BLADE_PROJECTS);

    //Whilst list is loading, the only element in the list is "LOADING"
    if (loading) return (<option value="LOADING">LOADING</option>);

    //Error returns an empty list
    if (error) {
        console.log(error.message);
        return (<option value="LOADING">ERROR</option>);
    }
    //Returns a dropdown of all the testrigs present in DB
    return data.AllBladeProjects.map(
        ({__typename, id, projectName, customer}:{__typename:string, id:string, projectName:string, customer:string}) => 
        (<option value={id} key={id}>{projectName}{"("}{customer}{")"}</option>));
}
export default ProjectSelector;