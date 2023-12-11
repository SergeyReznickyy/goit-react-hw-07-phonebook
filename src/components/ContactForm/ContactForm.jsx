import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { selectContacts } from '../../redux/selectors';
import { addContact } from '../../redux/operations';

import css from './сontactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const formReset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        throw new Error('unsupported type');
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    const {
      name: { value: name },
      number: { value: number },
    } = e.currentTarget.elements;

    const isExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExists) {
      return Report.info(
        'Enter correct information',
        `${name} is already in contacts`,
        'Ok'
      );
    }
    dispatch(addContact({ name, number }));

    formReset();
  };
  return (
    <form className={css.contact_form} onSubmit={submitHandler}>
      <div className={css.contact_form_wrapper}>
        <label className={css.text_label}>
          Name
          <input
            type="text"
            name="name"
            className={css.input}
            onChange={handleChange}
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.text_label}>
          Number
          <input
            type="tel"
            name="number"
            className={css.input}
            onChange={handleChange}
            value={number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>
      <button type="submit" className={css.btn_submit}>
        Add contact
      </button>
    </form>
  );
};
