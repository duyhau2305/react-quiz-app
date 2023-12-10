import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [questionAmount, setQuestionAmount] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Sử dụng Axios để tải danh sách các loại câu hỏi từ API
    axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => {
        setCategories(response.data.trivia_categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleQuestionAmountChange = (event) => {
    setQuestionAmount(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedCategory || !selectedDifficulty || !selectedType || !questionAmount) {
      setOpenModal(true);
    } else {
      navigate('/question', {
        state: {
          amount: questionAmount,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          type: selectedType,
        },
      });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
          value={selectedCategory}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">Select Category</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="difficulty-label">Difficulty</InputLabel>
        <Select
          labelId="difficulty-label"
          value={selectedDifficulty}
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
          value={selectedType}
          label="Type"
          onChange={handleTypeChange}
        >
         
          <MenuItem value="multiple">Multiple Choice</MenuItem>
          <MenuItem value="boolean">True / False</MenuItem>
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

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Missing Information</DialogTitle>
        <DialogContent>
          Please fill in all required fields.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Dashboard;
