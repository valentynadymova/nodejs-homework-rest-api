
const {v4} = require("uuid");
const fs=require("fs/promises");
const path= require('path');

const contactsPath = path.join(__dirname,'contacts.json') ;
console.log('contcatsPath:', contactsPath);


const listContacts= async () =>{
     const dataString= await fs.readFile(contactsPath,'utf8');
     const data=JSON.parse(dataString);
     return data;
  }
  
 const getContactById = async(contactId)=> {
    const  allContacts= await listContacts();
    const contact = allContacts.find(item=>item.id===contactId);
    return contact ? contact:null;
  }
  
  const removeContact= async(contactId)=> {
    const contacts=await listContacts();
    const idx= contacts.findIndex(item=>item.id===contactId);
    if(idx===-1){
        return null;
    }
     const removeContactbyId=contacts.filter((_,index)=>index !==idx);
     await fs.writeFile(contactsPath, JSON.stringify(removeContactbyId));
     return contacts[idx];
  }
  
 const  addContact= async(data)=> {
    const contacts= await listContacts();
    const newContact={...data, id: v4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }

  const updateContact=async(contactId,data)=>{
    const contacts =await listContacts();
    const contactIdx = contacts.findIndex((item)=> item.id===contactId);
    if (contactIdx===-1){
      return null;
    }
    contacts[contactIdx]={...data,contactId};
    console.log(contacts[contactIdx]);
    await fs.writeFile(contactsPath,JSON.stringify(contacts));
    return contacts[contactIdx];

  }

  module.exports={
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact};

