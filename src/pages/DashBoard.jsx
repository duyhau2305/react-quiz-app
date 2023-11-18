import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

function DashBoard() {
  const navigate = useNavigate(); 
    const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [questionAmount, setQuestionAmount] = useState('');

  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleQuestionAmountChange = (event) => {
    setQuestionAmount(event.target.value);
  };

  
  const handleSubmit = () => {
    
    console.log(category, difficulty, type, questionAmount);    
    navigate('/question');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Quiz App
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="science">Science</MenuItem>
          <MenuItem value="math">Math</MenuItem>
          {/* ... thêm các options khác */}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="difficulty-label">Difficulty</InputLabel>
        <Select
          labelId="difficulty-label"
          value={difficulty}
          label="Difficulty"
          onChange={handleDifficultyChange}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          label="Type"
          onChange={handleTypeChange}
        >
          <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
          <MenuItem value="true-false">True / False</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Amount of Questions"
        value={questionAmount}
        onChange={handleQuestionAmountChange}
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit} 
        fullWidth
        sx={{ marginTop: 2 }}
      >
        GET STARTED
      </Button>
    </Container>
  );
}

export default DashBoard;
