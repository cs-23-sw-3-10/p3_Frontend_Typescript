import React, {Component} from 'react';
import {GET_TEST_TYPES} from '../../api/queryList';
import { useQuery} from '@apollo/client';
import { Http2ServerRequest } from 'http2';
import { Diversity1 } from '@mui/icons-material';


//Queries test types and insert them into the BT-Menu
function TestTypeSelector(){
    const { loading, error, data} = useQuery(GET_TEST_TYPES);

    //Whilst list is loading, the only element in the list is "LOADING"
    if(loading) return(
        <div className="item testtype_wrapper">
            <h2 className="title">Type</h2>
            <select className="testtype_select" id="testtype" name="testtype">
                <option value="LOADING">LOADING</option>
            </select>
        </div>
    );

    //Error returns an empty list
    if(error){
        console.log(error.message);
        return (<div>Error</div>);
    }
    
    //Used to give keys to elements in the list
    let key = 1;
    //Returns a dropdown of all the test types present in DB
    return(
        <div className="item testtype_wrapper">
            <h2 className="title">Type</h2>
            <select className="testtype_select" id="testtype" name="testtype">
                {data.DictionaryAllByCategory.map(({label}:{label:string}) => ( <option value={label.toString()} key={key++}>{label}</option> ))}
            </select>
        </div>
    );

}
    /* Template Element If Fetch Stops Working - Easier to style with
        
        <div className="item testtype_wrapper">
                <h2 className="title">Type</h2>
                <select className="testtype_select" id="testtype" name="testtype">
                    <option value="fsp_test">Flapwise Static Proof</option>
                    <option value="esp_test">Edgewise Static Proof</option>
                    <option value="pfs_test">Post Fatigue Static</option>
                    <option value="ff_test">Flapwise Fatigue</option>
                    <option value="ef_test">Edgewise Fatigue</option>
                </select>
        </div>
    */
 
export default TestTypeSelector;