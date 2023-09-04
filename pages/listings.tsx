import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Stack } from '@mui/material';
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";
import PropertyPage from "../components/PropertyListing";

const API_URL = 'http://192.168.1.235:3000/api';

export default function Listings() {
    const [listings, setListings] = useState([]);
    const [accountType, setAccountType] = useState('');

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.post(`${API_URL}/getListings`);
                setListings(response.data.listings);
                console.log("Current listings:", response.data.listings);

            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        };

        fetchListings();
    }, []);

    return (
        <div>
            <TopNav accountType={accountType} />

            <Container>
                <Typography variant="h4" gutterBottom>
                    Property Listings
                </Typography>

                {listings.length === 0 &&
                    <Typography variant="h6" color="textSecondary">
                        No listings available.
                    </Typography>
                }

                <Stack spacing={4}>
                    {listings.map(listing => (
                          /*     ID
                              address
                              city
                              state
                              zip
                              price
                              bedrooms
                              bathrooms
                              sqaureFeet
                              description
                              dateListed
                              isActive
                              agentID
                              realtorName
                              dateModified */
                      
                        <PropertyPage
                            ID={listing.id}
                            address={listing.address}
                            city={listing.city}
                            state={listing.state}
                            zip={listing.zip}
                            price={listing.price}
                            bedrooms={listing.bedrooms}
                            bathrooms={listing.bathrooms}
                            squareFeet={listing.squareFeet}
                            description={listing.description}
                            dateListed={listing.dateListed}
                            isActive={listing.isActive}
                            agentID={listing.agentID}
                            dateModified={listing.dateModified}

                        />
                    ))}
                </Stack>
            </Container>

            <BottomNav />
        </div>
    );
}
