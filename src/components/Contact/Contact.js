import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { deleteContact } from "../../redux/actions";
import css from "./Contact.module.css";

export const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(contact.id));

  return (
    <div className={css.wrapper}>
      <p className={css.text}>
        {contact.name}:&nbsp;&nbsp;&nbsp;&nbsp; {contact.phone}
      </p>
      <button className={css.btn} onClick={handleDelete}>
        <MdClose size={24} />
      </button>
    </div>
  );
};
