import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import axios from 'axios';
const API_URL = 'http://192.168.1.235:3000/api';

const EditPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [propertyDetails, setPropertyDetails] = useState({
        ID: id,
        address: '',
        city: '',
        state: '',
        zip: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        squareFeet: '',
        description: '',
        dateListed: '',
        isActive: '',  // Assuming default is true
        agentID: ''
    });

    useEffect(() => {
        if(id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API_URL}/getPropertyDetails/${id}`);
                    const data = response.data.listing;

                    setPropertyDetails({
                        ID: data.id,
                        address: data.address,
                        city: data.city,
                        state: data.state,
                        zip: data.zip,
                        price: data.price,
                        bedrooms: data.bedrooms,
                        bathrooms: data.bathrooms,
                        squareFeet: data.squareFeet,
                        description: data.description,
                        dateListed: data.dateListed,
                        isActive: data.isActive,
                        agentID: data.agentID,
                    });

                } catch (error) {
                    console.error("Error fetching property details:", error);
                }
            };

            fetchData();
        }
    }, [id]);
    
    const handleSubmit = async () => {
        try {
            // Using Express API endpoint for updating a property listing (assuming it exists):
            const response = await axios.post(`${API_URL}/editListing`, propertyDetails);
    
            if (response.status === 200) {
                alert(response.data.message);  // Alert success message
            } else {
                alert(response.data.error);    // Alert any errors
            }
    
        } catch (error) {
            console.error("Error updating property:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyDetails(prev => ({ ...prev, [name]: value }));
    };

    return ( <Container>
        <Typography variant="h4">Edit Property</Typography>

        <TextField 
            label="Address"
            name="address"
            value={propertyDetails.address}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />

        <TextField 
            label="City"
            name="city"
            value={propertyDetails.city}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />

        <TextField 
            label="State"
            name="state"
            value={propertyDetails.state}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />

        <TextField 
            label="ZIP Code"
            name="zip"
            value={propertyDetails.zip}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />

        <TextField 
            label="Price"
            name="price"
            value={propertyDetails.price}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />

        <TextField 
            label="Bedrooms"
            name="bedrooms"
            value={propertyDetails.bedrooms}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />

        <TextField 
            label="Bathrooms"
            name="bathrooms"
            value={propertyDetails.bathrooms}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />

        <TextField 
            label="Square Feet"
            name="squareFeet"
            value={propertyDetails.squareFeet}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />

        <TextField 
            label="Description"
            name="description"
            value={propertyDetails.description}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />

        <TextField 
            label="Date Listed"
            name="dateListed"
            type="date"
            value={propertyDetails.dateListed}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
        />

        <TextField 
                    label="Is Active?"
                    name="isActive"
                    value={propertyDetails.isActive}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />


        <TextField 
            label="Agent ID"
            name="agentID"
            value={propertyDetails.agentID}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />

        {/* If you want to add a switch for the isActive field or other specialized components, you can do so here. */}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update Property
        </Button>
    </Container>
);
};

export default EditPage;