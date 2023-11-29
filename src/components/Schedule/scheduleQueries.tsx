import {client} from '../../api/client';
import {GET_BT_DATE_INFO} from '../../api/queryList';
import { useQuery } from '@apollo/client';

//Use to check query result
export function DisplayAllBladeTasks(){
    client.query({ query: GET_BT_DATE_INFO}).then((result) => console.log(result));
}

//Returns all Blade Tasks containing only date info -> Used for schedule insertion
//When using function: Check return type to be object, then parse data as needed
//Error handling is done by the caller
export default function GetBladeTaskDateInfo(){
    const { loading, error, data } = useQuery(GET_BT_DATE_INFO);

    if (loading) return "Loading";
    if (error) throw new Error(error.message);
    if (data) return data?.AllBladeTasks; //Use of optional chaining operator (?.) for safe access to object properties
}
