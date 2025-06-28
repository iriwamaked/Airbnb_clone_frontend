import styles from './GuestSelector.module.css';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { setGuests } from '../../store/slices/guestSlice';
import { useDispatch, useSelector } from 'react-redux';

import GuestInfoDisplay from './GuestInfoDisplay/GuestInfoDisplay';

const GuestSelector = ({ maxGuests = Infinity, onClose, petsAllowed = false, maxPets, mode }) => {
    const dispatch = useDispatch();
    const guests = useSelector(state => state.guests);
    const { adults, children, infants, pets } = useSelector(state => state.guests);
    const totalGuests = adults + children;
    const handleChange = (field, value) => {
  const next = {
    ...guests,
    [field]: value
  };

//   const nextTotalGuests = next.adults + next.children;

  if (value < 0) return;
  if (field === "adults" && value < 1) return;
//   if (field === "pets" && (!petsAllowed || value > maxPets)) return;
//   if ((field === "adults" || field === "children") && nextTotalGuests > maxGuests) return;

  dispatch(setGuests({ [field]: value }));
};

    // const guestsString = maxGuests < 4 ? "гостя" : "гостей";
    // const petsString = maxPets < 1 ? "тварини" : "тварин";

    const isGuestLimitExceeded = totalGuests > maxGuests;
    const warningMessage = isGuestLimitExceeded && mode === "property"
        ? (
            <p className={styles.warningText}>
                Ви перевищили максимальну кількість гостей для цього помешкання({maxGuests}). Будь ласка, зменште кількість дорослих або дітей, або оберіть інше помешкання.
            </p>
        )
        : null;
            const warningMessagePets = isGuestLimitExceeded && mode === "property"
        ? (
            <p className={styles.warningText}>
                Ви перевищили максимальну кількість тварин для цього помешкання ({maxPets}). Будь ласка, зменште кількість тварин або оберіть інше помешкання.
            </p>
        )
        : null;

    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);
    return (
        <div className={styles.guestsDropdown}
            ref={dropdownRef}
            //Нужно вынести GuestSelector из DOM-цепочки, чтобы не зависел от родителя
            //иначе при клике на кнопку "Закрити" повторно вызывается onClick родителя
            //и компонент снова открывается e.stopPropagation() - запрещает всплытие элемента
            onClick={(e) => e.stopPropagation()}>
            <div>
                <div><b>Дорослі</b> <small className='ms-2'>(від 13 р.)</small></div>
                <button onClick={() => handleChange("adults", adults - 1)} disabled={adults === 0}>-</button>
                <span>{adults}</span>
                <button onClick={() => { handleChange("adults", adults + 1); }}>+</button>
            </div>
            <div>
                <div><b>Діти</b> <small className='ms-2'>(від 2 до 12 р.) </small></div>
                <button onClick={() => handleChange("children", children - 1)} disabled={children === 0}>-</button>
                <span>{children}</span>
                <button onClick={() => handleChange("children", children + 1)} >+</button>
                
            </div>
            {warningMessage}
            <div>
                <div><b>Немовлята</b> <small className='ms-2'>(до 2 р.)</small></div>
                <button onClick={() => handleChange("infants", infants - 1)} disabled={infants === 0}>-</button>
                <span>{infants}</span>
                <button onClick={() => handleChange("infants", infants + 1)}>+</button>
            </div>
            <div>
                <div><b>Домашні тварини</b></div>

                <button onClick={() => handleChange("pets", pets - 1)} disabled={!petsAllowed || pets === 0}>-</button>
                <span>{pets}</span>
                <button onClick={() => handleChange("pets", pets + 1)} disabled={!petsAllowed}>+</button>
              
            </div>
              {warningMessagePets}
            {/* {mode=== "property" && (
                <>
                    <p className={`mt-2 ${styles.infoText}`}>
                        У цьому помешканні може перебувати <b>{maxGuests} {guestsString}</b>, не враховуючи немовлят.
                    </p>
                    <p className={styles.infoText}>
                        Перебування з домашніми тваринами <b>{petsAllowed ? `дозволено в кількості до ${maxPets} ${petsString}` : "не дозволено"}</b>.
                    </p>
                </>
            )} */}
            <GuestInfoDisplay mode={mode} maxGuests={maxGuests} petsAllowed={petsAllowed} maxPets={maxPets} />

            <div className={styles.closeButton} onClick={() => {
                console.log('Кнопка Закрити нажата');
                onClose();
            }}>Закрити</div>
        </div>
    )
}

GuestSelector.propTypes = {
    maxGuests: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    petsAllowed: PropTypes.bool,
    maxPets: PropTypes.number,
    mode: PropTypes.string.isRequired
}

export default GuestSelector;