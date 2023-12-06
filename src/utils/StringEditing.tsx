export function capitalize(string:string){
    return string.split(" ").map(first_lastname_array => first_lastname_array.charAt(0).toUpperCase() + first_lastname_array.slice(1)).join(" ")
};

export function sanitize(input: string) {
    const sanitizedString = input.replace(/[^a-zA-Z0-9_ -]/g, "");
    return sanitizedString;
};