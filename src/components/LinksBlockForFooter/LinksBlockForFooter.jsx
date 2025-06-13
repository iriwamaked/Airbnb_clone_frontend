
import styles from './LinksBlockForFooter.module.css';

const LinksBlockForFooter =()=>{
  return(
     
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
  );
}

export default LinksBlockForFooter;
  