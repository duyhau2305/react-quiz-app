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
      // setScore(score + 1);
    }

    // next question
    setQuestionIndex(questionIndex + 1);
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

      {/* <Box mt={5}>
        Score: {score} / {questions.length}
      </Box> */}
      {/* {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
            {question.question}
          </Typography>

          {question.type === 'multiple' ? (
            <FormControl component="fieldset">
              <RadioGroup name={`question${index}`}>
                {question.incorrect_answers.map((answer, i) => (
                  <FormControlLabel
                    key={i}
                    value={answer}
                    control={<Radio />}
                    label={
                      <Typography variant="body1" style={{ marginLeft: '10px' }}>
                        {answer}
                      </Typography>
                    }
                  />
                ))}
                <FormControlLabel
                  value={question.correct_answer}
                  control={<Radio />}
                  label={
                    <Typography variant="body1" style={{ marginLeft: '10px', color: 'green' }}>
                      {question.correct_answer}
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          ) : (
            <FormControl component="fieldset">
              <RadioGroup name={`question${index}`}>
                <FormControlLabel
                  value="True"
                  control={<Radio />}
                  label={
                    <Typography variant="body1" style={{ marginLeft: '10px' }}>
                      True
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="False"
                  control={<Radio />}
                  label={
                    <Typography variant="body1" style={{ marginLeft: '10px' }}>
                      False
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          )}
        </div>
      ))} */}
    </Box>
  );
}

export default Question;