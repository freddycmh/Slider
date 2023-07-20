import React, { useState } from 'react';
import './form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons'
import { faShirt } from '@fortawesome/free-solid-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'




function WeightedSumForm() {
    const [material, setMaterial] = useState(1);
    const [design, setDesign] = useState(1);
    const [price, setPrice] = useState(1);
    const [rankedBrands, setRankedBrands] = useState([]);

    const brands = [
        { name: "Gildan G185", price: 1, material: 1, design: 1 },
        { name: "Bella canvas", price: 1, material: 2, design: 2 },
        { name: "Champions s700", price: 2, material: 2, design: 3 },
        { name: "Independent trading co", price: 2, material: 3, design: 3 },
        { name: "AS colour", price: 2, material: 3, design: 4 },
        { name: "Comfort color", price: 3, material: 4, design: 3 },
        { name: "Made Blank", price: 3, material: 4, design: 4 },
        { name: "Rue Porter", price: 3, material: 5, design: 4 },
        { name: "LA aparell", price: 5, material: 5, design: 4 },
        { name: "Mde Blank Recess", price: 4, material: 4, design: 4 },
        { name: "Original Favorites", price: 3, material: 4, design: 5 }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate the distance between user preferences and each brand's attributes
        const distances = brands.map((brand) => ({
            name: brand.name,
            distance: Math.abs(brand.material - material) +
                Math.abs(brand.design - design) +
                Math.abs(brand.price - price)
        }));

        // Sort the brands based on the distance in ascending order
        const sortedBrands = distances.sort((a, b) => a.distance - b.distance);

        // Get the top 3 ranked brands
        const topRankedBrands = sortedBrands.slice(0, 3);

        // Update the ranked brands state
        setRankedBrands(topRankedBrands);
    };

    return (
        <div>
            <div className="container">
                <form onSubmit={handleSubmit}>

                    <h3>Select your preferences</h3>

                    <p>Adjust the slider to meet your preferred setting for your blank!</p>

                    <div className='slide'>
                        <label htmlFor="material">Fit</label>
                        <br/>
                    
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
                        <span >{material}</span>
                        <FontAwesomeIcon icon={faShirt} className='' />
                

                    </div>

                    <div className='slide'>
                        <label htmlFor="design">Weight</label>
                        <br/>
                         <FontAwesomeIcon icon={faFeather} />
                        
                        <input
                            type="range"
                            id="design"
                            name="design"
                            min="1"
                            max="5"
                            value={design}
                            onChange={(e) => setDesign(parseInt(e.target.value))}

                        />
                        <span >{design}</span>
                         <FontAwesomeIcon icon={faFeather}  className=''/>

                    </div>
                    <div className='slide'>
                        <label htmlFor="price">Price</label>
                        <br/>

                        <FontAwesomeIcon icon={faDollarSign} />

                        <input
                            type="range"
                            id="price"
                            name="price"
                            min="1"
                            max="5"
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value))}

                        />
                        <span >{price}</span>
                        <FontAwesomeIcon icon={faDollarSign} />
         


                    </div>
                    <br />
                    <input type="submit" value="Submit" />


                </form >
            </div>

            <div className='output'>

                {
                    rankedBrands.length > 0 && (
                        <div>
                            <h3>Ranked Brands</h3>
                            <ol>
                                {rankedBrands.map((brand, index) => (
                                    <li key={index}>
                                        {brand.name}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )
                }
            </div>

        </div >
    );
}

export default WeightedSumForm;
