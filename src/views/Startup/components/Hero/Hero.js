/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Container from 'components/Container';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { func } from 'prop-types';

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your name'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
});

const aff = [];

function getList(duration) {
  return new Promise(() => {
    axios.get('/faculty/affiliations')
      .then(function(res)  {
        aff = res
        console.log(aff)
      })
      .catch(function (err) {
        console.log(err)
      })
  });
}

const Hero = () => {
  const theme = useTheme();

  const initialValues = {
    name: '',
    email: '',
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const onSubmit = (values) => {
    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const [aff_open, aff_setOpen] = React.useState(false);
  const [aff_options, aff_setOptions] = React.useState([]);
  const aff_loading = aff_open && aff_options.length === 0;

  const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];

  React.useEffect(() => {
    let active = true;

    if (!aff_loading) {
      return undefined;
    }

    (async () => {
      await getList(); // For demo purposes.

      if (active) {
        aff_setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [aff_loading]);

  React.useEffect(() => {
    if (!aff_open) {
      aff_setOptions([]);
    }
  }, [aff_open]);

  return (
    <Box position={'relative'} zIndex={2}>
      <Box
        position={'relative'}
        zIndex={2}
        minHeight={{ xs: 'calc(100vh - 158px)', md: 'calc(100vh - 230px)' }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginTop={-13}
        paddingTop={13}
        sx={{
          '&::after': {
            content: '""',
            backgroundColor: theme.palette.primary.light,
            backgroundImage: `linear-gradient(315deg, ${theme.palette.primary.light} 0%, #9cb5db 50%)`,
            opacity: '0.9',
            width: 1,
            height: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 3,
          },
        }}
      >
        <Container position={'relative'} zIndex={4}>
          <Box>
            <Box marginBottom={4}>
              <Typography
                variant={'h3'}
                align={'center'}
                gutterBottom
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: 700,
                }}
              >
                Find out the Top influential researchers
              </Typography>
            </Box>
            <Box
              padding={{ xs: 3, sm: 6 }}
              width={1}
              component={Card}
              boxShadow={1}
              data-aos="fade-up"
            >
              <form
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
              >
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
                  <Box
                    width={1}
                    marginRight={{ xs: 0, md: 2 }}
                    marginBottom={{ xs: 4, md: 0 }}
                    display={'flex'}
                    flexDirection={{ xs: 'column', md: 'row' }}
                  >

                    <Box width={0.5}>
                      <Autocomplete
                        id="Autocomplete_aff"
                        sx={{
                          marginRight: { xs: 0, md: 2 },
                          marginBottom: { xs: 4, md: 0 },
                        }}
                        open={aff_open}
                        onOpen={() => {
                          aff_setOpen(true);
                        }}
                        onClose={() => {
                          aff_setOpen(false);
                        }}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                        getOptionLabel={(option) => option.title}
                        options={aff_options}
                        loading={aff_loading}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              height: 54,
                              marginRight: { xs: 0, md: 2 },
                              marginBottom: { xs: 4, md: 0 },
                            }}
                            variant="outlined"
                            color="primary"
                            size="medium"
                            label="Affiliation"
                            fullWidth
                            name={'affiliation'}
                            value={formik.values.TextField}
                            onChange={formik.handleChange}
                          >
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {aff_loading ? <CircularProgress color="inherit" size={20} /> : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                          </TextField>
                        )}
                      ></Autocomplete>
                    </Box>
                  </Box>

                  <Box>
                    <Button
                      sx={{ height: 54, whiteSpace: 'nowrap', minWidth: 100 }}
                      variant="contained"
                      color="primary"
                      size="medium"
                      fullWidth
                      type="submit"
                    >
                      Send
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>


          <Box height={1} marginTop={7}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
