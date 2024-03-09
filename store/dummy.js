const db = {
    'user': [
        { id: '1' , name: 'Francisco'},
        { id: '2' , name: 'Ricardo'},
    ]
};

async function list(table) {
    return db[table];
}

async function get(table, id) {
    let col = await list(table);

    return col.find(item => item.id === id) || null;
}

async function upsert(table, data) {
    db[table].push(data);

    return data;
}

async function remove(table, id) {

    db[table] = db[table].filter(item => item.id !== id);

    return true;
}


module.exports = {
    list,
    get,
    upsert,
    remove
}