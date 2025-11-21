import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accordian from "./components/accordian";
import AudioPlayer from "./components/audioPlayer";
import ButtonRippleEffect from "./components/buttonRippleEffect";
import Clock from "./components/clock";
import CurrencyConverter from "./components/currencyConverter";
import DragAndDrop from "./components/dragAndDrop";
import ExpenseTracker from "./components/expenceTracker";
import FolderTreeView from "./components/folderTreeView";
import Home from "./components/home";
import ImageSlider from "./components/imageSlider";
import InfiniteScroll from "./components/infiniteScroll";
import Modal from "./components/modalWithOutsideClick/";
import NestedComments from "./components/nestedComments";
import Pagination from "./components/pagination";
import RandomColor from "./components/randomColor";
import ScrollIndicator from "./components/scrollIndicator";
import ScrollTOSection from "./components/scrollToSection";
import SearchAutocomplete from "./components/searchAutocomplete";
import StarRating from "./components/starRating";
import StepProgressBar from "./components/stepProgressBar";
import TicTacToe from "./components/ticTacToe";
import ToolTip from "./components/toolTip";
import ToggleTheme from "./components/toggleTheme";
import WeatherAPP from "./components/weatherAPP";
import QuizApp from "./components/quizApp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="accordian" element={<Accordian />} />
        <Route path="audioPlayer" element={<AudioPlayer />} />
        <Route path="buttonRippleEffect" element={<ButtonRippleEffect />} />
        <Route path="clock" element={<Clock />} />
        <Route path="currencyConverter" element={<CurrencyConverter />} />
        <Route path="dragAndDrop" element={<DragAndDrop />} />
        <Route path="expenceTracker" element={<ExpenseTracker />} />
        <Route path="folderTreeView" element={<FolderTreeView />} />
        <Route path="imageSlider" element={<ImageSlider />} />
        <Route path="infiniteScroll" element={<InfiniteScroll />} />
        <Route path="modal" element={<Modal />} />
        <Route path="nestedComments" element={<NestedComments />} />
        <Route path="pagination" element={<Pagination />} />
        <Route path="randomColor" element={<RandomColor />} />
        <Route path="scrollIndicator" element={<ScrollIndicator />} />
        <Route path="scrollToSection" element={<ScrollTOSection />} />
        <Route path="searchAutocomplete" element={<SearchAutocomplete />} />
        <Route path="starRating" element={<StarRating />} />
        <Route path="stepProgressBar" element={<StepProgressBar />} />
        <Route path="ticTacToe" element={<TicTacToe />} />
        <Route path="toolTip" element={<ToolTip />} />
        <Route path="toggleTheme" element={<ToggleTheme />} />
        <Route path="weather" element={<WeatherAPP />} />
        <Route path="quizApp" element={<QuizApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
