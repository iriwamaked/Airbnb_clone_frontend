import { GUESTINFOMODES } from "./GuestInfoModes";
import { useSelector } from "react-redux";
import styles from './GuestInfoDisplay.module.css'
import { getGuestsString, getPetsString } from "../../../utils/guestsStringFormatter";

const GuestInfoDisplay = ({ mode, maxGuests, maxPets, petsAllowed }) => {
    const { adults, children, infants, pets } = useSelector(state => state.guests);
    const totalGuests = adults + children;
    const guestsString = getGuestsString(totalGuests);
    const petsString = getPetsString(pets);

    if (mode === GUESTINFOMODES.SEARCHPANEL) {
        return (
            <p className={styles.infoText}>
                Обрано:<b>{totalGuests} {guestsString}</b>{pets > 0 ? `,${pets} ${petsString}` : ""}.
            </p>
        )
    }
    if (mode === GUESTINFOMODES.PROPERTY && totalGuests <= maxGuests) {
        return (
            <>
                <p className={`mt-2 &styles.infoText`}>
                    У цьому помешканні може перебувати <b>{maxGuests} {guestsString}, не враховуючи немовлят</b>
                </p>
                <p className={styles.infoText}>
                    Перебування з домашніми тваринами <b>{petsAllowed ? `дозволено в кількості до ${maxPets} ${petsString}` : "не дозволено"}</b>.
                </p>
            </>
        )
    }
    if (mode === GUESTINFOMODES.PROPERTY && totalGuests > maxGuests) {
    return (
      <p className={`${styles.infoText} text-red-500`}>
        Ви обрали <b>{totalGuests} {guestsString}</b>, але в помешканні, що переглядається, дозволено максимум до <b>{maxGuests} {guestsString}</b>.
      </p>
    );
  }

  return null;
}

export default GuestInfoDisplay;