import { useState } from "react";
import styles from "./CheckoutPage.module.css";

const CheckoutPage = () => {
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
                <span>4–9 січ.2024</span>
              </div>
              <div>
                <strong>Гості</strong>
                <span>1 гість</span>
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
                    Сплатіть усю суму ($335,00) одразу.
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

          <div className={styles.section}>
            <h3>Оплатити за допомогою</h3>
            <select>
              <option>Кредитна або дебетова картка</option>
            </select>
            <input type="text" placeholder="Номер картки" />
            <div className={styles.rowInputs}>
              <input type="text" placeholder="Термін дії" />
              <input type="text" placeholder="CVV" />
            </div>
            <input type="text" placeholder="Індекс" />
            <select>
              <option>Країна/регіон Україна</option>
            </select>
          </div>

          <div className={styles.section}>
            <h3>Потрібно для подорожі</h3>
            <ul className={styles.infoList}>
              <li>
                <strong>Напишіть господарю</strong>
                Повідомте господаря про мету своєї подорожі та час прибуття.
              </li>
              <li>
                <strong>Фотографія профілю</strong>
                Господарі хочуть знати, хто гостюватиме в їхній оселі.
              </li>
              <li>
                <strong>Номер телефону</strong>
                Додайте й підтвердьте номер телефону, щоб отримувати новини про подорож.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>Правила скасування бронювання</h3>
            <p>
              <strong>Безкоштовне скасування бронювання до 30 груд.</strong> У разі
              скасування бронювання до прибуття 4 січ. вам повернуть частину коштів.{" "}
              <a href="#">Докладніше</a>
            </p>
          </div>

          <div className={styles.section}>
            <h3>Основні правила</h3>
            <p>
              Ми просимо всіх мандрівників памʼятати кілька простих правил належної поведінки гостя.
            </p>
            <ul>
              <li>• Дотримуйтесь правил дому</li>
              <li>• Ставтеся до помешкання господаря як до власної оселі</li>
            </ul>
          </div>

          <div className={styles.footerNote}>
            Натискаючи кнопку нижче, я приймаю умови{" "}
            <a href="#">Правила дому господаря</a>,{" "}
            <a href="#">Основні правила для гостей</a>. Правила повторного
            бронювання та повернення коштів HomeFU, які HomeFU може застосовувати в разі
            моєї відповідальності за нанесення збитків (стягнути кошти відповідно до мого способу оплати).
          </div>

          <button className={styles.confirmBtn}>Підтвердити й оплатити</button>
        </section>

        <section className={styles.right}>
          <div className={styles.summaryCard}>
            <img src="https://via.placeholder.com/300x200" alt="preview" />
            <p className={styles.roomTitle}>Помешкання для оренди цілком</p>
            <small className={styles.roomSub}>
              Студія та спальня з панорамою моря! Аркадія!
            </small>

            <div className={styles.rating}>
              ★ 4.95 · <a href="#">35 відгуків</a>
            </div>

            <div className={styles.section}>
              <h3 className={styles.summaryTitle}>Детальніше про ціну</h3>
              <div className={styles.summaryLine}>
                <span>$63,20 × 5 ночей</span>
                <span>$315,00</span>
              </div>
              <div className={styles.summaryLine}>
                <a href="#">Плата за прибирання</a>
                <span>$20,00</span>
              </div>
              <div className={styles.summaryTotal}>
                <strong>Усього <span>(USD)</span></strong>
                <strong>$335,00</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CheckoutPage;
