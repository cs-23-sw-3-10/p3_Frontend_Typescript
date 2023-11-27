//This file will handle utils functions for the RessourcesMenu component
//Sanitize string to remove any non-alphanumeric characters




export function SanitizeString(str: string) : string {
    let output : string = str.replace(/[^a-zA-Z0-9]/g, '');
    return output;
}

