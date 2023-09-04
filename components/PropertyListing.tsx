import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Button
} from "@mui/material";
import Link from 'next/link';
interface PropertyProps {
  ID: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: string;
  description: string;
  dateListed: string;
  isActive: string;
  agentID: string; // Making it optional since you might populate it later.
  dateModified: string;
}

const PropertyPage: React.FC<PropertyProps> = (props) => {
  const {
    ID,
    address,
    city,
    state,
    zip,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    description,
    dateListed,
    isActive,
    agentID,
    dateModified,
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
          {/* Some icon or content could be placed here */}
        </IconButton>
      </Box>
    </Toolbar>
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid item xs={12} sm={6}>
        <Stack direction="column" spacing={2}>
          <Typography variant="subtitle1">Address:</Typography>
          <Typography variant="body1">{address}</Typography>
          <Typography variant="subtitle1">Bedrooms:</Typography>
          <Typography variant="body1">{bedrooms}</Typography>
          <Typography variant="subtitle1">Bathrooms:</Typography>
          <Typography variant="body1">{bathrooms}</Typography>
          <Typography variant="subtitle1">Square Feet:</Typography>
          <Typography variant="body1">{squareFeet}</Typography>
          <Typography variant="subtitle1">Price:</Typography>
          <Typography variant="body1">{price}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack direction="column" spacing={2}>
          <Typography variant="subtitle1">Location:</Typography>
          <Typography variant="body1">{`${city}, ${state} ${zip}`}</Typography> {/* Using template literals for location */}
          <Typography variant="subtitle1">Description:</Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography variant="subtitle1">Date Listed:</Typography>
          <Typography variant="body1">{dateListed}</Typography>
          <Typography variant="subtitle1">Is Active:</Typography>
          <Typography variant="body1">{isActive}</Typography>
          <Typography variant="subtitle1">Realtor:</Typography>
          <Typography variant="body1">{agentID}</Typography>
          <Typography variant="subtitle1">Pictures:</Typography>
          {/* If you have images or a carousel, it can be placed here */}
          <Typography variant="subtitle1">Date Modified:</Typography>
          <Typography variant="body1">{dateModified}</Typography>
        </Stack>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href={`/edit/${ID}`}>
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  </Box>
  
    );
  };
  
  export default PropertyPage;
  