import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { decode } from 'html-entities';

// mui core
import { Typography, Box, Button } from '@mui/material';

function Question() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [score,setScore] =useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // call api to get questions
  React.useEffect(() => {
    const amount = searchParams.get('amount');
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const type = searchParams.get('type');

    if (!amount || !category || !difficulty || !type) {
      navigate('/');
      return;
    }
    // Sử dụng Axios để tải câu hỏi từ API dựa trên các tùy chọn
    axios
      .get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
      .then((response) => {
        setQuestions(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  // set options & correct answer
  React.useEffect(() => {
    if(questions.length === 0) return;
    const item = questions[questionIndex];
    // combine random answers with correct answer
    const options = [...item.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * options.length + 1);
    options.splice(randomIndex, 0, item.correct_answer);
    // [0, 1, 2] => randomIndex = 1 => [0, 1, 2].splice(1, 0, 'correct_answer') => [0, 'correct_answer', 1, 2]
    // [0, 1, 2] => randomIndex = 2 => [0, 1, 2].splice(2, 0, 'correct_answer') => [0, 1, 'correct_answer', 2]
    setOptions(options);
  }, [questions, questionIndex])

  function handleAnswer(answer) {
    const item = questions[questionIndex];
    const isCorrect = item.correct_answer === answer;

    console.log('handleAnswer: ', {
      questions,
      isCorrect,
      answer
    })

    if(isCorrect) {
      setScore(score + 1);
    }

    // next question
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setQuestionIndex(nextQuestionIndex);
    } else {
      // Navigate to Score component with the final score
      navigate('/score', { state: { finalScore: score } });
    }
  }

  console.log('questions: ', {
    questions,
    options
  })

  return (
    <Box>
      <Typography variant='h4' textAlign='center'>Question {questionIndex + 1}</Typography>
      <Typography mt={5} >
        {decode(questions[questionIndex]?.question || '')}
      </Typography>
      {options.map((option, index) => (
        <Box mt={2} key={index} onClick={() => handleAnswer(option)}>
          <Button variant="contained" fullWidth>{decode(option)}</Button>
        </Box>
      ))}
      <Typography variant="h6" mt={5}>Score: {score}</Typography> {/* Display the score */}
      

    </Box>
  );
}

export default Question;