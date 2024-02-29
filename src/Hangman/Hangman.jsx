import React, { useState, useEffect, useRef } from "react";
import "./Hangman.scss";
import asset1 from "../Assets/asset1.png";
import asset2 from "../Assets/asset2.png";
import asset3 from "../Assets/asset3.png";
import asset4 from "../Assets/asset4.png";
import asset5 from "../Assets/asset5.png";
import asset6 from "../Assets/asset6.png";

const Hangman = () => {
  const [wordData, setWordData] = useState({
    word: "",
    hint: "",
    blankWord: "",
  });

  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [hide, setHide] = useState(false);
  const [clickedLetters, setClickedLetters] = useState([]);

  const overRef = useRef(null);

  const hangmanImages = [asset1, asset2, asset3, asset4, asset5, asset6];

  let hangImage;
  if (incorrect >= 0 && incorrect < hangmanImages.length) {
    hangImage = <img src={hangmanImages[incorrect]} alt="" />;
  } else {
    // Handle the case where incorrect guesses exceed available images
    hangImage = <img src={hangmanImages[hangmanImages.length - 1]} alt="" />;
  }

  const selectRandomWord = () => {
    const categories = {
      Programming_Language: [
        "javascript",
        "PHP",
        "csharp",
        "kotlin",
        "python",
        "java",
        "ruby",
        "swift",
        "go",
        "rust",
      ],
      Animal: [
        "tiger",
        "lion",
        "elephant",
        "zebra",
        "giraffe",
        "monkey",
        "leopard",
        "horse",
        "Buffalo",
        "hippopotamus",
      ],
      Country: [
        "senegal",
        "canada",
        "india",
        "australia",
        "japan",
        "brazil",
        "germany",
        "nepal",
        "france",
        "argentina",
      ],
      Fruit: [
        "apple",
        "banana",
        "orange",
        "grape",
        "pineapple",
        "mango",
        "strawberry",
        "watermelon",
        "litchi",
        "peach",
      ],
      Color: [
        "red",
        "blue",
        "green",
        "yellow",
        "purple",
        "orange",
        "black",
        "white",
        "pink",
        "brown",
      ],
      Vehicle: [
        "car",
        "motorcycle",
        "bicycle",
        "bus",
        "truck",
        "train",
        "airplane",
        "helicopter",
        "boat",
        "scooter",
      ],
      Religion: [
        "hinduism",
        "islam",
        "christianity",
        "buddhism",
        "judaism",
        "sikhism",
        "jainism",
        "athiesm",
        "taoism",
      ],
      Shape: [
        "circle",
        "square",
        "triangle",
        "rectangle",
        "pentagon",
        "hexagon",
        "octagon",
        "oval",
        "rhombus",
        "trapezoid",
      ],
      Sports: [
        "soccer",
        "basketball",
        "tennis",
        "golf",
        "cricket",
        "rugby",
        "swimming",
        "volleyball",
        "baseball",
        "football",
      ],
      Footballer: [
        "messi",
        "ronaldo",
        "neymar",
        "pele",
        "mbappe",
        "ronaldinho",
        "maradona",
        "cruyff",
        "kaka",
        "marcelo",
      ],
      Capital_City: [
        "tokyo",
        "beijing",
        "berlin",
        "rome",
        "bangkok",
        "moscow",
        "berlin",
        "london",
        "paris",
        "kathmandu",
      ],
      Video_Game: [
        "gta",
        "minecraft",
        "fortnite",
        "pubg",
        "roblox",
        "overwatch",
        "terraria",
        "valorant",
        "dota",
        "fallguys",
      ],
    };

    const categoryKeys = Object.keys(categories);
    const randomCategory =
      categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

    const wordsInCategory = categories[randomCategory];

    const randomWordIndex = Math.floor(Math.random() * wordsInCategory.length);
    const randomWord = wordsInCategory[randomWordIndex];

    const blankWord = "_".repeat(randomWord.length);

    return { word: randomWord, hint: randomCategory, blankWord: blankWord };
  };

  useEffect(() => {
    const { word, hint, blankWord } = selectRandomWord();
    setWordData({ word, hint, blankWord });
  }, []);

  const handleLetterClick = (letter) => {
    if (clickedLetters.includes(letter)) {
      return;
    }

    const { word } = wordData;
    const isLetterInWord = word.includes(letter.toLowerCase());

    if (isLetterInWord) {
      const updatedBlankWord = word
        .split("")
        .map((char, index) => {
          if (char.toLowerCase() === letter.toLowerCase()) {
            return letter;
          } else {
            return wordData.blankWord[index];
          }
        })
        .join("");

      setWordData((prevWordData) => ({
        ...prevWordData,
        blankWord: updatedBlankWord,
      }));
      setCorrect(correct + 1);
      if (!updatedBlankWord.includes("_")) {
        overRef.current.innerHTML = "<h1>You Won</h1>";
        setHide(true);
      }
    } else {
      setIncorrect(incorrect + 1);
      if (incorrect >= 4) {
        overRef.current.innerHTML = "<h1>You Lose</h1>";
        setHide(true);
      }
    }
    setClickedLetters([...clickedLetters, letter]);
  };

  const alphabetButtons = Array.from({ length: 26 }, (_, index) => {
    const letter = String.fromCharCode(65 + index);
    return (
      <button key={index} onClick={() => handleLetterClick(letter)}>
        {letter}
      </button>
    );
  });

  const reset = () => {
    window.location.reload();
  };

  return (
    <div className="main flex">
      <div className="title-container">
        <div className="title">HangBot</div>
      </div>
      <div className="container flex">
        <div className="left">{hangImage}</div>
        <div className="right">
          <div
            className="right-show flex"
            style={{ display: hide ? "none" : "flex" }}
          >
            <div className="guess ">
              <span>{wordData.blankWord}</span>
            </div>
            <div className="desc">
              <span>Hint </span>: The word belongs to {wordData.hint} category
            </div>
            <div className="incorrect">
              Incorrect guesses : <span>{incorrect}/5</span>
            </div>
            <div className="letters-container">
              <div className="letters">{alphabetButtons}</div>
            </div>
          </div>
          <div
            className="right-hide flex"
            style={{ display: hide ? "flex" : "none" }}
          >
            <div className="hide-title" ref={overRef}></div>
            <div className="hide-word">
              The correct word was{" "}
              <span className="hide-span"> {wordData.word}</span>
            </div>
            <div className="reset-">
              <button className="reset-btn" onClick={reset}>
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hangman;
