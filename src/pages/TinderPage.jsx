import React, { useState, useEffect } from 'react';
import fs from 'fs';
import { supabase } from '../supabaseClient';

// Helper function to get member count
async function getMemberCount(partyId) {
  const { count, error } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .eq('party_id', partyId);

  if (error) throw error;
  return count;
}

const TinderPage = () => {
    const [votes, setVotes] = useState({});
    const [restaurants, setRestaurants] = useState([]);
    const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [memberCount, setMemberCount] = useState(0);
    const [restaurantCount, setRestaurantCount] = useState(0);

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
                setRestaurants(restaurantData.slice(0, 5)); // Limit to first 5 restaurants

                
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
            if (newIndex >= 5) { // Hard-coded limit of 5 restaurants
                return <div>All restaurants have been shown. Thank you for voting!</div>;
                setRestaurantCount(0); // Reset restaurant count after 5 swipes
            }
            return newIndex;
        });

        // const playerName = prompt("Please enter your name:");
        // const restaurantId = restaurants[currentRestaurantIndex].id;
        // const vote = direction === 'right' ? 'like' : 'dislike';

        // setVotes((prevVotes) => {
        //     const newVotes = { ...prevVotes };
        //     if (!newVotes[restaurantId]) {
        //         newVotes[restaurantId] = { likes: 0, dislikes: 0 };
        //     }
        //     if (vote === 'like') {
        //         newVotes[restaurantId].likes += 1;
        //     } else {
        //         newVotes[restaurantId].dislikes += 1;
        //     }
        // //     return newVotes;
        // });

        // // Save votes to a CSV file
        // const csvData = `${playerName},${restaurantId},${vote}\n`;
        // fs.appendFile('votes.csv', csvData, (err) => {
        //     if (err) console.error('Error writing votes to file:', err);
        // });

        // Increment restaurant count
        // setRestaurantCount((prevCount) => prevCount + 1);
    };

    // Check if all restaurants have been shown
    // if (restaurantCount >= 5) { // Hard-coded limit of 5 restaurants
    //     setRestaurantCount(0); // Reset restaurant count after 5 swipes
        
    // }
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
                <div className="completion-card">
                    <h2>Lau Pa Sat is the winner!</h2>
                    <img src="https://www.laupasat.sg/nitropack_static/yiOaHEJwQErVvzLyfoMGpgsXyGSYwxUP/assets/images/optimized/rev-9a73174/www.laupasat.sg/wp-content/uploads/2024/04/banner-satay-street.jpg" alt="Lau Pa Sat" />
                    <p>You've reviewed all the restaurants in this session.</p>
                    <p>We appreciate your time and hope you had fun!</p>
                    <button className="action-button" onClick={() => window.location.reload()}>
                        Start Over
                    </button>
                </div>
            )}
        </div>
    );
};

export default TinderPage;
