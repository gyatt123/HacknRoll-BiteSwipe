import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const TinderPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Get party ID from URL or local storage
    const partyId = window.location.pathname.split('/').pop();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch restaurants
                const { data: restaurantData, error: restaurantError } = await supabase
                    .from('restaurants')
                    .select('*');

                if (restaurantError) throw restaurantError;
                setRestaurants(restaurantData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [partyId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSwipe = (direction) => {
        setCurrentRestaurantIndex((prevIndex) => {
            let newIndex = prevIndex;
            if (direction === 'right') {
              newIndex = prevIndex + 1;
            } else if (direction === 'left') {
              newIndex = prevIndex + 1;
            }
            if (newIndex >= restaurants.length) {
                newIndex = 0;
            }
            return newIndex;
        });
    };

    return (
        <div>
            <div className="member-count">
                Members in Party: 2
            </div>
            <h1>Tinder Page</h1>
            {restaurants.length > 0 && currentRestaurantIndex < restaurants.length ? (
                <div className="restaurant-card">
                  <div key={restaurants[currentRestaurantIndex].id}>
                      <h2>{restaurants[currentRestaurantIndex].name}</h2>
                      <p>Cuisine: {restaurants[currentRestaurantIndex].cuisines}</p>
                      <p>Price Range: {restaurants[currentRestaurantIndex].price_range}</p>
                      <p><a href={restaurants[currentRestaurantIndex].menu} target="_blank">Menu</a></p>
                      <a className="website-link" href={restaurants[currentRestaurantIndex].website} target="_blank">Website</a>
                      {restaurants[currentRestaurantIndex].images && restaurants[currentRestaurantIndex].images.map((image, index) => (
                          <img key={index} src={image} alt={`${restaurants[currentRestaurantIndex].name} food ${index+1}`} />
                      ))}
                  </div>
                    <div className="button-container">
                        <button onClick={() => handleSwipe('left')}>X</button>
                        <button onClick={() => handleSwipe('right')}>❤️</button>
                    </div>
                </div>
             ) : (
                <p>No more restaurants to display.</p>
            )}
        </div>
    );
};

export default TinderPage;
