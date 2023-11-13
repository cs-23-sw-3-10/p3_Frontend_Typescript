import './EquipmentSelector.css'

function EquipmentSelectionMenu(){
    return(
        <div className='equipment_menu'>
            <h2 className="equipment_menu_title">DB</h2>
            <input className="equipment_menu_search" type="text" />
            <div className="equipment_menu_items_wrapper">
                <div className="equipment_menu_item">
                    <button className="equipment_menu_item_button"></button>
                </div>
            </div>
        </div>
    );

}
export default EquipmentSelectionMenu;