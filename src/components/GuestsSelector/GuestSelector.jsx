import styles from './GuestSelector.module.css';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { setGuests } from '../../store/slices/guestSlice';
import { useDispatch, useSelector } from 'react-redux';

const GuestSelector = ({ maxGuests, onClose, petsAllowed = false, maxPets }) => {
    const dispatch = useDispatch();
    const guests = useSelector(state => state.guests);
    const { adults, children, infants, pets } = useSelector(state => state.guests);
    const totalGuests = adults + children;
    const handleChange = (field, value) => {
        if (field === "adults" || field === "children") {
            const newTotal =
                (field === "adults" ? value : guests.adults) +
                (field === "children" ? value : guests.children);
            if (newTotal > maxGuests || value < 0 || (field === "adults" && value < 1)) return;
        }

        if (field === "infants" && (value < 0 || value > 5)) return;
        if (field === "pets" && (value < 0 || value > maxPets || !petsAllowed)) return;

        dispatch(setGuests({ [field]: value }));
    };


    // const [adults, setAdults] = useState(1);
    // const [children, setChildren] = useState(0);
    // const [infants, setInfants] = useState(0);
    // const [pets, setPets] = useState(0);


    // const increment = (type) => {
    //     if ((type === 'adults' || type === 'children') && totalGuests < maxGuests) {
    //         dispatch(setGuests({ [type]: guests[type] + 1 }));
    //     } else if (type === 'infants' && infants < 5) {
    //         dispatch(setGuests({ infants: infants + 1 }));
    //     } else if (type === 'pets' && petsAllowed && pets < maxPets) {
    //         dispatch(setGuests({ pets: pets + 1 }));
    //     }
    // };

    // const decrement = (type) => {
    //     if (type === 'adults' && adults > 1) {
    //         dispatch(setGuests({ adults: adults - 1 }));
    //     } else if (type === 'children' && children > 0) {
    //         dispatch(setGuests({ children: children - 1 }));
    //     } else if (type === 'infants' && infants > 0) {
    //         dispatch(setGuests({ infants: infants - 1 }));
    //     } else if (type === 'pets' && petsAllowed && pets > 0) {
    //         dispatch(setGuests({ pets: pets - 1 }));
    //     }
    // };

    const guestsString = maxGuests < 4 ? "гостя" : "гостей";
    const petsString = maxPets < 1 ? "тварини" : "тварин";

    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                console.log("Клик вне компонента");
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
                <button onClick={() => handleChange("adults", adults-1)}>-</button>
                <span>{adults}</span>
                <button onClick={() => { handleChange("adults", adults + 1); console.log({ maxGuests }) }} disabled={totalGuests >= maxGuests}>+</button>
            </div>
            <div>
                <div><b>Діти</b> <small className='ms-2'>(від 2 до 12 р.) </small></div>
                <button onClick={() => handleChange("children", children - 1)}>-</button>
                <span>{children}</span>
                <button onClick={() => handleChange("children", children + 1)} disabled={totalGuests >= maxGuests}>+</button>
            </div>
            <div>
                <div><b>Немовлята</b> <small className='ms-2'>(до 2 р.)</small></div>
                <button onClick={() => handleChange("infants", infants - 1)}>-</button>
                <span>{infants}</span>
                <button onClick={() => handleChange("infants", infants+1)} disabled={infants >= 5}>+</button>
            </div>
            <div>
                <div><b>Домашні тварини</b></div>

                <button onClick={() => handleChange("pets", pets-1)} disabled={!petsAllowed || pets === 0}>-</button>
                <span>{pets}</span>
                <button onClick={() => handleChange("pets", pets+1)} disabled={!petsAllowed}>+</button>
            </div>
            <p className={`mt-2 ${styles.infoText}`}>
                У цьому помешканні може перебувати <b> {maxGuests} {guestsString}</b>, не враховуючи немовлят.</p>
            <p className={styles.infoText}>Перебування з домашніми тваринами <b>{petsAllowed ? `дозволено в кількості до ${maxPets} ${petsString}.` : "не дозволено"}</b>
            </p>

            <div className={styles.closeButton} onClick={() => {
                console.log('Кнопка Закрити нажата');
                onClose();
            }}>Закрити</div>
        </div>
    )
}

GuestSelector.propTypes = {
    maxGuests: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    petsAllowed: PropTypes.bool,
    maxPets: PropTypes.number
}

export default GuestSelector;