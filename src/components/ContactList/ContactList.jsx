import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  selectIsLoading,
  selectError,
  selectVisibleContacts,
} from '../../redux/selectors';
import { fetchContacts, deleteContact } from '../../redux/operations';
import ContactItem from 'components/ContactItem/ContactItem';
import { Loader } from '../Loader/Loader';
import css from './contact.module.css';

export const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {' '}
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      <ul className={css.contact_list}>
        {contacts.map(({ id, name, number }) => (
          <ContactItem
            key={id}
            name={name}
            number={number}
            onDelete={() => {
              dispatch(deleteContact(id));
            }}
          />
        ))}
      </ul>
    </>
  );
};
