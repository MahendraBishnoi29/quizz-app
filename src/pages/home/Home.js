import { Button, MenuItem, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import "./Home.css";
import Categories from "../../Categories/Categories";
import ErrorMessage from "../../components/error/ErrorMessage";

const Home = ({ name, setName, fetchQuestions }) => {
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        {error && <ErrorMessage> Please Fill All The fields </ErrorMessage>}

        <span>Quiz Settings</span>

        <div className="settings_select">
          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            label="Select Category"
            variant="outlined"
            style={{ marginBottom: 30 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Categories?.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Select Difficulty"
            variant="outlined"
            style={{ marginBottom: 30 }}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            size="large"
          >
            Start Quiz
          </Button>
        </div>
      </div>

      <img src="./quiz.svg" alt="Logo" className="banner" />
    </div>
  );
};

export default Home;
