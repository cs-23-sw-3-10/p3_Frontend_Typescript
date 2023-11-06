import {client} from '../../index';
import {GET_BT_DATE_INFO} from '../../api/queryList';
import { useQuery } from '@apollo/client';

//Use to check query result
export function DisplayAllBladeTasks(){
    client.query({ query: GET_BT_DATE_INFO}).then((result) => console.log(result));
}

//Returns all Blade Tasks containing only date info -> Used for schedule insertion
//When using function: Check return type to be object, then parse data as needed
//Error handling is done by the caller
export default function GetBTDateInfo(){
    const { loading, error, data } = useQuery(GET_BT_DATE_INFO);

    if (loading) return "Loading";
    if (error) throw new Error(error.message);
    if (data) return data?.AllBladeTasks; //We use Optional Chaining operator (?.) for safe access to object properties
}
