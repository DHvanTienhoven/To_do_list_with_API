const myAPIurl = `https://jsonbox.io/box_1aa6992dfbf0e9d85529/`

//GET request
const getTasks = async() => {
    let result = await fetch(myAPIurl, {method: "GET"});
    let json = await result.json();
    console.log(json);
    return json;
};

//POST request
const postTask = async data =>{
    const result = await fetch(myAPIurl,{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            },
        });
    const json = await result.json();
    console.log(json);
    };

//DELETE requests
const deleteOneTask = async id => {
    const result = await fetch(`${myAPIurl}${id}`, { 
        method: "DELETE" });
    const json = await result.json();
    console.log(json);
};

const deleteAllTasks = async() => {
    const result = await fetch(myAPIurl);
    const json = await result.json();
    json.forEach(item => deleteOneTask(item._id));
    console.log(json);
}  

//PUT request
const completeOneTask = async (id, data, state) =>{
    const result = await fetch(`${myAPIurl}${id}`, {
        method: "PUT",
        body: JSON.stringify({description: data, done: state}),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await result.json();
    console.log(json);
}

