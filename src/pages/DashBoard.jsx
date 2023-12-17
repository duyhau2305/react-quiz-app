import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      category: "",
      difficulty: "",
      type: "",
      amount: "",
    }
  });

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => {
        setCategories(response.data.trivia_categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const onSubmit = data => {
    navigate('/question', { state: data });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Quiz App
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id={field.name}>Select Category</InputLabel>
              <Select
                labelId={field.name}
                label="Category"
                {...field}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="difficulty"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id={field.name}>Select Difficulty</InputLabel>
              <Select
                labelId={field.name}
                label="Difficulty"
                {...field}
              >
                {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                  <MenuItem key={difficulty} value={difficulty.toLowerCase()}>
                    {difficulty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="amount"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              fullWidth
              margin="normal"
              label="Number of Questions"
              type="number"
              {...field}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id={field.name}>Select Type</InputLabel>
              <Select
                labelId={field.name}
                label="Type"
                {...field}
              >
                {['Multiple Choice', 'True/False'].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase().replace(' ', '_')}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Button
          variant="contained"
          color="primary"
          type='submit'
          fullWidth
          sx={{ marginTop: 2 }}
        >
          GET STARTED
        </Button>
      </form>
    </Container>
  );
}

export default Dashboard;
