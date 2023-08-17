import {
  faDollarSign,
  faFeather,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import values from "../../values";
import img from "../assets/image/rock.png";
import "./form.css";

function WeightedSumForm() {
  const [material, setMaterial] = useState(1);
  const [design, setDesign] = useState(1);
  const [price, setPrice] = useState(1);
  const [email, setEmail] = useState("");
  const [rankedBrands, setRankedBrands] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const brands = [
    {
      name: "Los Angeles Apparel 1801GD",
      price: 4,
      weight: 4,
      fit: 4,
      best: "Streetwear",
    },
    {
      name: "Bella + Canvas 3001",
      price: 2,
      weight: 1,
      fit: 1,
      best: "Promotional",
    },
    {
      name: "Shaka Wear SHMHSS",
      price: 3,
      weight: 4,
      fit: 5,
      best: "Streetwear",
    },
    { name: "Gildan G500", price: 1, weight: 2, fit: 2, best: "Promotional" },
    {
      name: "Comfort Colors C1717",
      price: 4,
      weight: 3,
      fit: 3,
      best: "Casual",
    },
    {
      name: "Next Level 3600",
      price: 3,
      weight: 1,
      fit: 1,
      best: "Promotional",
    },
    { name: "Gildan 980", price: 1, weight: 2, fit: 2, best: "Casual" },
    { name: "Hanes 5180", price: 3, weight: 3, fit: 4, best: "Casual" },
    {
      name: "MADE Blanks Homeroom",
      price: 2,
      weight: 4,
      fit: 3,
      best: "Streetwear",
    },
    {
      name: "MADE Blanks Major",
      price: 4,
      weight: 3,
      fit: 4,
      best: "Streetwear",
    },
    {
      name: "Original Favorites Supima Cotton",
      price: 5,
      weight: 3,
      fit: 3,
      best: "Luxury",
    },
    { name: "Rue Porter RP18XX", price: 5, weight: 5, fit: 5, best: "Luxury" },
    { name: "Alstyle 1301", price: 1, weight: 3, fit: 3, best: "Casual" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email) {
      setIsloading(true);
      // Calculate the distance between user preferences and each brand's attributes
      const distances = brands.map((brand) => ({
        name: brand.name,
        best: brand.best,
        distance:
          Math.abs(brand.material - material) +
          Math.abs(brand.design - design) +
          Math.abs(brand.price - price),
      }));

      // Sort the brands based on the distance in ascending order
      const sortedBrands = distances.sort((a, b) => a.distance - b.distance);

      // Get the top 3 ranked brands
      const topRankedBrands = sortedBrands.slice(0, 2);

      // Update the ranked brands state
      setRankedBrands(topRankedBrands);
      const data = {
        fit: material,
        weight: design,
        price,
        email,
        brand1: topRankedBrands[0].name,
        brand2: topRankedBrands[1].name,
        brand3: " ",
      };
      axios
        .post(`${values.baseURL}/internship`, data)
        .then((d) => {
          console.log(d.data);
          setIsloading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("set email ");
    }
  };

  return (
    <div className="internship">
      <div className="internship-body">
        <div className="internship-body-top">
          <div className="left">
            <span className="left-1"></span>
            <span className="left-2"></span>
            <span className="left-3"></span>
          </div>
          <div className="right">
            <h3 className="internship-body-title">Select your preferences</h3>
            <p className="internship-body-text">
              Adjust the slider to meet your preferred setting for your blank!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {" "}
          <div className="slide">
            {" "}
            <label htmlFor="material">Fit</label>
            <FontAwesomeIcon icon={faShirt} />
            <input
              type="range"
              id="material"
              name="material"
              min="1"
              max="5"
              value={material}
              onChange={(e) => setMaterial(parseInt(e.target.value))}
            />
            {/* <span>{material}</span> */}
            <FontAwesomeIcon icon={faShirt} className="" />
          </div>
          <div className="slide">
            {" "}
            <label htmlFor="design">Weight</label>
            <FontAwesomeIcon icon={faFeather} className="" />
            <input
              type="range"
              id="design"
              name="design"
              min="1"
              max="5"
              value={design}
              onChange={(e) => setDesign(parseInt(e.target.value))}
            />
            {/* <span>{design}</span> */}
            <img src={img} alt="" />
          </div>{" "}
          <div className="slide">
            <label htmlFor="price">Price</label>

            <FontAwesomeIcon icon={faDollarSign} />

            <input
              type="range"
              id="price"
              name="price"
              min="1"
              max="5"
              value={price}
              onChange={(e) => {
                setPrice(parseInt(e.target.value));
              }}
            />
            {/* <span>{price}</span> */}
            <div className="">
              <FontAwesomeIcon icon={faDollarSign} />
              <FontAwesomeIcon icon={faDollarSign} />
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
          </div>
          <div className="slided">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <input type="submit" value={(isLoading && "sending") || "Submit"} />
        </form>
      </div>

      <div className="output">
        {rankedBrands.length > 0 && (
          <div>
            <h3>Results</h3>
            <ol>
              {rankedBrands.map((brand, index) => (
                <li key={index}>
                  <strong>{brand.name}</strong>
                  <br />
                  <>
                    <i>Best for {brand.best}</i>
                  </>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeightedSumForm;
