import { useState } from "react";
import styles from "./CheckoutPage.module.css";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const data = location.state || {};

  const [selected, setSelected] = useState("full");

  return (
    <div className={styles.wrapper}>
      <main className={styles.checkout}>
        <section className={styles.left}>
          <a href="#" className={styles.backLink}>
            ‹ Підтвердження й оплата
          </a>

          <div className={styles.rareBox}>
            <p>Це рідкісна знахідка</p>
            <small>
              Помешкання господаря Марія зазвичай заброньоване.
            </small>
          </div>

          <div className={styles.section}>
            <h3>Ваша подорож</h3>
            <div className={styles.tripInfo}>
              <div>
                <strong>Дати</strong>
                <span>{data.checkIn} – {data.checkOut}</span>
              </div>
              <div>
                <strong>Гості</strong>
                <span>{data.guests} гість</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Виберіть варіант оплати</h3>
            <div className={styles.radioGroup}>
              <label className={styles.radioCard}>
                <input
                  type="radio"
                  name="payment"
                  checked={selected === "full"}
                  onChange={() => setSelected("full")}
                />
                <div>
                  <div className={styles.radioTitle}>Оплатити в повному обсязі</div>
                  <div className={styles.radioSub}>
                    Сплатіть усю суму (${data.total}) одразу.
                  </div>
                </div>
              </label>

              <label className={styles.radioCard}>
                <input
                  type="radio"
                  name="payment"
                  checked={selected === "split"}
                  onChange={() => setSelected("split")}
                />
                <div>
                  <div className={styles.radioTitle}>Оплата двома частинами</div>
                  <div className={styles.radioSub}>
                    $65,60 потрібно оплатити сьогодні, $262,40 – 22 грудня 2023. <br />
                    Жодних додаткових зборів.{" "}
                    <a href="#">Докладніше</a>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* остальной код остаётся таким же */}
        </section>

        <section className={styles.right}>
          <div className={styles.summaryCard}>
            <img src={data.image} alt="preview" />
            <p className={styles.roomTitle}>Помешкання для оренди цілком</p>
            <small className={styles.roomSub}>
              {data.title}
            </small>

            <div className={styles.rating}>
              ★ {data.rating} · <a href="#">{data.reviews} відгуків</a>
            </div>

            <div className={styles.section}>
              <h3 className={styles.summaryTitle}>Детальніше про ціну</h3>
              <div className={styles.summaryLine}>
                <span>${data.pricePerNight} × {data.nights} ночей</span>
                <span>${data.pricePerNight * data.nights}</span>
              </div>
              <div className={styles.summaryLine}>
                <a href="#">Плата за прибирання</a>
                <span>${data.cleaningFee}</span>
              </div>
              <div className={styles.summaryTotal}>
                <strong>Усього <span>(USD)</span></strong>
                <strong>${data.total}</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CheckoutPage;
