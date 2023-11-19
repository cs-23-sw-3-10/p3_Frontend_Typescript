import {GET_ALL_BT_NAMES} from '../../api/queryList';
import { useLazyQuery} from '@apollo/client';
import  {client} from '../../index';

function TaskNameSelector({setBTName}:{setBTName:Function}){
    return(
        <input 
                    className='item id_select' 
                    type="text" 
                    placeholder='Select Task Name'
                    onBlur={(e) => {setBTName(e.currentTarget.value)}}
                />
    );
}
export default TaskNameSelector;
