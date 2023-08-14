import { useEffect, useState } from 'react';
import {  
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText,
    DialogActions,
    Select, InputLabel, MenuItem, Checkbox} from '@mui/material';
    import { DatePicker } from '@mui/x-date-pickers';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
    import { LocalizationProvider } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";
import { getCookie } from 'typescript-cookie';


const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '20px',
});

const SearchForm = styled('form')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  marginTop: '20px',
});

const SearchButton = styled(Button)({
  marginTop: '20px',
});

const SearchResultList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

const SearchResultItem = styled('li')({
  margin: '10px 0',
});

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [accountType, setAccountType] = useState('');
  const [username, setUsername] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({pricePerDay: 10});
  const [type, setType] = useState('Boarding');
  const [status, setStatus] = useState('');
  const [fromUser, setFromUser] = useState('');
  const [toUser, setToUser] = useState('');
  const [price, setPrice] = useState('');
  const [dateStarted, setDateStarted] = useState('');
  const [dateDue, setDateDue] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleClose = () => {
    setIsDialogOpen(false);
    setToUser('');
  };
  useEffect (() => {
    let accountType = getCookie('AccountType')
    let username = getCookie('Username')
    setUsername(username)
    setAccountType(accountType)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://192.168.1.235:3000/api/listingSearch/', {
        listingName: searchTerm,
      });

      setResults(response.data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  const handleRowSelect = async (record) => {
    setSelectedRecord(record);
    setToUser(record.username)
    setIsDialogOpen(true);
  };

  const handleSave = async (record) => {
    console.log({
      type,
      status,
      fromUser,
      toUser,
      price,
      dateStarted,
      dateDue,
    });
    try {
      const response = await axios.post('http://192.168.1.235:3000/api/placeOrder', {
        type: type,
        status: 'Pending',
        fromUser: username,
        meetAndGreet: isChecked.toString(),
        toUser: toUser,
        price: estimatedPrice.toString(),
        dateStarted: dateStarted,
        dateDue: dateDue, // Due date is 7 days from now
      });
      console.log(response.data);
      alert('Order placed successfully');
    } catch (error) {
      console.error(error);
      alert('Error placing order');
    }
    setIsDialogOpen(false);
    setToUser('');
  };

  useEffect (() => {
    const calculatePrice = () => {
      if (dateStarted && dateDue) {
        const startDate = new Date(dateStarted);
        const dueDate = new Date(dateDue);
        const timeDiff = Math.abs(dueDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return selectedRecord.pricePerDay * diffDays;
      }
      return 0;
    };
    const estimatedPrice = calculatePrice();
    setEstimatedPrice(estimatedPrice);
  }, [dateStarted, dateDue])



  return (
    <SearchContainer>
    <TopNav accountType={accountType}/>
    <Typography variant="h4">Search for Properties</Typography>
    <SearchForm onSubmit={handleSubmit}>
        <TextField
            label="Search Term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
        </SearchButton>
    </SearchForm>

    {results.length === 0 ? (
        <Typography variant="body1">No results found.</Typography>
    ) : (
        <SearchResultList>
            <SearchResultItem>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Property Name</TableCell>
                                <TableCell>Property Type</TableCell>
                                <TableCell>Bedrooms</TableCell>
                                <TableCell>Bathrooms</TableCell>
                                <TableCell>Property Size</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Pictures URLs</TableCell>
                                <TableCell>Realtor Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {results.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>{record.propertyName}</TableCell>
                                    <TableCell>{record.propertyType}</TableCell>
                                    <TableCell>{record.bedrooms}</TableCell>
                                    <TableCell>{record.bathrooms}</TableCell>
                                    <TableCell>{record.propertySize}</TableCell>
                                    <TableCell>{record.price}</TableCell>
                                    <TableCell>{record.location}</TableCell>
                                    <TableCell>{record.PicturesURLs}</TableCell>
                                    <TableCell>{record.realtorName}</TableCell>
                                    <TableCell>{record.description}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleRowSelect(record)}>View Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {results.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={10}>No results found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SearchResultItem>
        </SearchResultList>
    )}
    <BottomNav />
</SearchContainer>

  );
};

export default SearchPage;
