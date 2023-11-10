import {GET_ALL_BT_NAMES} from '../../api/queryList';
import { useLazyQuery} from '@apollo/client';
import  {client} from '../../index';


function HandleBTNameValidation(e:React.FormEvent<HTMLInputElement>){
    client.query({query: GET_ALL_BT_NAMES}).then((result) => console.log(result))
}

function TaskNameSelector(){
    return(
        <input 
                    className='item id_select' 
                    type="text" 
                    placeholder='Select Task Name'
                    onBlur={(e) => {HandleBTNameValidation(e)}}
                />
    );
}


/*
function TaskNameSelector(){
    const [getBTNames, {loading, error, data}] = useLazyQuery(GET_ALL_BT_NAMES, {
        onCompleted: () => {
            console.log(data?.variables);
        }
    });

    if(loading) return(<div>LOADING</div>);
    if(error) return(<div>ERROR</div>);

    if(data?.AllBladeTasks !== undefined){
        console.log(data?.AllBladeTasks);
    }

    return(
        <input 
                    className='item id_select' 
                    type="text" 
                    placeholder='Select Task Name'
                    onBlur={(e) => {
                        getBTNames({variables:{e}});
                    }}
                />
    );
}
*/

/*
                    <input 
                    className='item id_select' 
                    type="text" 
                    placeholder='Select Task Name'
                    onBlur={(e) => HandleBTNameValidation()}
                    />
                */


export default TaskNameSelector;
