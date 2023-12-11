import { BeatLoader } from 'react-spinners';

import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.wrapper}>
      <BeatLoader color="#4c93f099" size="25px" />
    </div>
  );
};
