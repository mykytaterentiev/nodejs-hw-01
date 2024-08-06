import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';
import { isValidJSON } from '../utils/isValidJSON.js';

export const addOneContact = async () => {
  const newContact = createFakeContact();
  try {
    const contactsDataJSON = await fs.readFile(PATH_DB, 'utf8');

    if (!isValidJSON(contactsDataJSON)) {
      throw new Error('Файл містить невалідний JSON');
    }

    const contactsData = Array.isArray(JSON.parse(contactsDataJSON))
      ? JSON.parse(contactsDataJSON)
      : [];
    const newContactsData = [...contactsData, newContact];

    await fs.writeFile(PATH_DB, JSON.stringify(newContactsData), 'utf8');
    console.log('Дані успішно додані до файлу.');
  } catch (error) {
    console.error('Помилка додавання даних до файлу:', error);
  }
};

addOneContact();
