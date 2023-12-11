import PropTypes from 'prop-types';

import css from './contactItem.module.css';

const ContactItem = ({ name, number, onDelete }) => {
  return (
    <li className={css.list_item}>
      <p className={css.list_text}>{name} :</p>
      <p className={css.list_text}>{number}</p>
      <button type="button" className={css.buttonDelete} onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactItem;
