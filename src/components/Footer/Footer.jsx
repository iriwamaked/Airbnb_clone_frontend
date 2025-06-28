// import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import SimpleFooter from "../SimpleFooter/SimpleFooter"; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Секция “Ідеї для майбутніх поїздок” */}
      <div className={styles.ideas}>
        <h3>Ідеї для майбутніх поїздок</h3>
        <div className={styles.navTabs}>
          <span className={styles.active}>Популярні</span>
          <span>Мистецтво й культура</span>
          <span>Відпочинок на відкритому повітрі</span>
          <span>Гори</span>
          <span>Пляж</span>
          <span>Категорії</span>
          <span>Чим зайнятися</span>
        </div>
        <div className={styles.locations}>
          <div>Canmore <p>Оренда квартир</p></div>
          <div>Benalmadena <p>Оренда будинків</p></div>
          <div>Марбелья <p>Оренда будинків</p></div>
          <div>Mixas <p>Оренда квартир</p></div>
          <div>Prescott <p>Оренда зрубів</p></div>
          <div>Скоттсдейл <p>Оренда помешкань із бас...</p></div>
          <div>Тусон <p>Оренда кондомініумів</p></div>
          <div>Jasper <p>Помешкання для відпоч...</p></div>
          <div>Маунтін-Б’ю <p>Оренда будинків</p></div>
          <div>Devonport <p>Помешкання для відпоч...</p></div>
          <div>Mallacoota <p>Помешкання для відпоч...</p></div>
          <div>Ейвісса <p>Помешкання для відпоч...</p></div>
          <div>Анахайм <p>Оренда помешкань для...</p></div>
          <div>Монтерей <p>Помешкання для відпоч...</p></div>
          <div>Paso Robles <p>Помешкання для відпоч...</p></div>
          <div>Санта-Барбара <p>Оренда заміських буд...</p></div>
          <div>Sonoma <p>Помешкання для відпоч...</p></div>
          <div><strong>Показати більше</strong></div>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Три колонки внизу */}
      <div className={styles.columns}>
        <div>
          <h4>Підтримка</h4>
          <p>Довідковий центр</p>
          <p>AirCover</p>
          <p>Протидія дискримінації</p>
          <p>Підтримка людей з інвалідністю</p>
          <p>Варіанти скасування бронювань</p>
          <p>Надіслати скаргу від сусідів</p>
        </div>
        <div>
          <h4>Прийом гостей</h4>
          <p>Перетворити помешкання на HomeFU</p>
          <p>AirCover для господарів</p>
          <p>Ресурси про прийом гостей</p>
          <p>Форум спільноти</p>
          <p>Відповідальний прийом гостей</p>
        </div>
        <div>
          <h4>HomeFU</h4>
          <p>Новини</p>
          <p>Нові функції</p>
          <p>Вакансії</p>
          <p>Інвестори</p>
          <p>Тимчасове житло від HomeFU</p>
        </div>
      </div>

      
      <div >
       <SimpleFooter />
      </div>
    </footer>
  );
};

export default Footer;
