// src/controllers/contacts.js
import createHttpError from 'http-errors';
import { getAllContacts, getContactById, createContact } from '../services/contacts.js';

// Controller to handle a request to fetch a single contact by its ID
export const getContactController = async (req, res, next) => {
  // Extracting contactId from the request parameters
  const { contactId } = req.params;

  try {
    // Fetch the contact by ID from the database
    const contact = await getContactById(contactId);

    // If the contact is not found, throw a 404 error
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    // Respond with a success message and the contact data
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller to handle a request to fetch all contacts
export const getContactsController = async (req, res, next) => {
  try {
    // Fetch all contacts from the database
    const contacts = await getAllContacts();

    // Respond with a success message and the contacts data
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller to handle a request to create a new contact 
export const createContactController = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  try {
    // Create the contact using the service
    const newContact = await createContact({ name, phoneNumber, email, isFavourite, contactType });

    // Respond with a success message and the created contact data
    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
}