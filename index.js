import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);
    case "get":
      const oneContact = await getContactById(id);
      return console.table(oneContact);
    case "add":
      const newContact = await addContact(data);
      return console.table(newContact);
    case "remove":
      const removedСontact = await removeContact(id);
      return console.table(removedСontact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
