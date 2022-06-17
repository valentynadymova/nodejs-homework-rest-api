const getAll=require('./getAll');
const addContact=require('./addContact');
const updateContact=require('./updateContact');
const updateContactStatus=require('./updateContactStatus');
const getById=require('./getById');
const removeContact=require('./removeContact');

module.exports={
    getAll,
    addContact,
    updateContact,
    updateContactStatus,
    getById,
    removeContact
}