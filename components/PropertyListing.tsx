import {
    Avatar,
    Box,
    Grid,
    IconButton,
    Stack,
    Toolbar,
    Typography,
  } from "@mui/material";
  
  interface PropertyProps {
    ID: string;
    propertyName: string;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    propertySize: string;
    price: string;
    location: string;
    picturesURLs: string[];
    realtorName: string;
    description: string;
  }
  
  const PropertyPage: React.FC<PropertyProps> = (props) => {
    const {
      ID,
      propertyName,
      propertyType,
      bedrooms,
      bathrooms,
      propertySize,
      price,
      location,
      picturesURLs,
      realtorName,
      description,
    } = props;
  
    return (
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Toolbar sx={{ backgroundColor: "#F9FAFB", boxShadow: "none", borderBottom: "1px solid #E5E7EB" }}>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div">
              Property ID: {ID}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="large" aria-label="profile">
              <Avatar alt={realtorName} src={picturesURLs[0]} sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Box>
        </Toolbar>
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} sm={6}>
            <Stack direction="column" spacing={2}>
              <Typography variant="subtitle1">Property Name:</Typography>
              <Typography variant="body1">{propertyName}</Typography>
              <Typography variant="subtitle1">Property Type:</Typography>
              <Typography variant="body1">{propertyType}</Typography>
              <Typography variant="subtitle1">Bedrooms:</Typography>
              <Typography variant="body1">{bedrooms}</Typography>
              <Typography variant="subtitle1">Bathrooms:</Typography>
              <Typography variant="body1">{bathrooms}</Typography>
              <Typography variant="subtitle1">Property Size:</Typography>
              <Typography variant="body1">{propertySize}</Typography>
              <Typography variant="subtitle1">Price:</Typography>
              <Typography variant="body1">{price}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="column" spacing={2}>
              <Typography variant="subtitle1">Location:</Typography>
              <Typography variant="body1">{location}</Typography>
              <Typography variant="subtitle1">Description:</Typography>
              <Typography variant="body1">{description}</Typography>
              <Typography variant="subtitle1">Realtor:</Typography>
              <Typography variant="body1">{realtorName}</Typography>
              <Typography variant="subtitle1">Pictures:</Typography>
              {picturesURLs.map((url, index) => (
                <img src={url} alt={`property-image-${index}`} key={index} style={{ width: '100%', margin: '10px 0' }}/>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default PropertyPage;
  