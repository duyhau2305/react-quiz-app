import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

function Question() {
  const location = useLocation();
  const { amount, category, difficulty, type } = location.state;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Sử dụng Axios để tải câu hỏi từ API dựa trên các tùy chọn
    axios
      .get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
      .then((response) => {
        setQuestions(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [amount, category, difficulty, type]);

  return (
    <div>
      <h1>Questions</h1>
      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          {/* Hiển thị câu hỏi */}
          <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
            {question.question}
          </Typography>

          {/* Hiển thị câu trả lời */}
          {question.type === 'multiple' ? (
            // Nếu câu hỏi là Multiple Choice
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
            // Nếu câu hỏi là True/False
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
      ))}
    </div>
  );
}

export default Question;