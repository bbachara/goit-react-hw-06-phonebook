import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../Button/Button";
import { addContact } from "../../redux/actions";
import { getContacts } from "../../redux/selectors";
import css from "./ContactForm.module.css";

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [error, setError] = useState("");

  // Write to localStorage when contacts state updates
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const phone = form.elements.phone.value;

    // Check if the name already exists
    const existingContact = contacts.find((contact) => contact.name === name);
    if (existingContact) {
      window.alert("Contact with this name already exists."); // Display alert
      return;
    }

    dispatch(addContact({ name, phone }));
    form.reset();
    setError("");
  };

  return (
    <div>
      <h2 className={css.title}>Adding Contacts</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        {error && <p className={css.error}>{error}</p>}
        <input
          className={css.field}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          placeholder="Enter contact name..."
          required
        />
        <input
          className={css.field}
          type="tel"
          name="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          title="Phone number must be in the format: XXX-XXX-XXXX"
          placeholder="Enter phone number (e.g., XXX-XXX-XXXX)..."
          required
        />
        <Button type="submit">Add contact</Button>
      </form>
    </div>
  );
};
