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
