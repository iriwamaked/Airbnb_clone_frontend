import { useState } from "react";
// import PropertyCard from "../../components/PropertyCards/PropertyCard";
import CategoryFilters from "../../components/CategoryFilters/CategoryFilters";
import PropertyPageMain from "../PropertyPageMain/PropertyPageMain"
import propertiesData from "../../data/properties"; // ✅ Импортируем данные
import styles from "./HomePage.module.css";
import IdeasForTravellsPage from "../../components/IdeasForTravels/IdeasForTravellsPage/IdeasForTravellsPage";

import { Helmet } from "react-helmet-async";

const HomePage = () => {
  const [properties, setProperties] = useState(propertiesData);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = ({ location }) => {
    let filtered = propertiesData.filter((p) =>
      p.location.toLowerCase().includes(location.toLowerCase())
    );
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    setProperties(filtered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    let filtered = category === "all" ? propertiesData : propertiesData.filter((p) => p.category === category);
    setProperties(filtered);
  };

  return (
    <div className={styles.home}>
       <Helmet>
        <title>Головна - пошук житла</title>
        <meta name="description" content="Знайдіть ідеальне житло для Вашої подорожі." />
      </Helmet>

      <CategoryFilters 
          className={styles.stickyFilters}
          selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />
     
   {/* <div className={styles.grid}>
        {properties.length > 0 ? (
          properties.map((property) => <PropertyCard key={property.id} {...property} />)
        ) : (
          <p className={styles.noResults}>Ничего не найдено 😞</p>
        )}
      </div> */}
   

      <PropertyPageMain />
      <IdeasForTravellsPage/>

      
    </div>


  );
};

export default HomePage;
