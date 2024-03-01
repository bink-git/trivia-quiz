import { useState } from 'react';
import { Button } from './ui/button';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

const Welcome = ({ onStart, onDifficulty }) => {
  const [select, setSelect] = useState('');

  const handleSelect = (event) => {
    setSelect(event.target.value);
    onDifficulty(event.target.value);
  };

  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <p className="text-4xl font-bold text-background text-center">
        Welcome to the Trivia Challenge
      </p>
      <label className="text-background font-bold" htmlFor="selectOption">
        Please, select difficulty
      </label>
      <select
        name="select"
        id="selectOption"
        value={select}
        onChange={handleSelect}
        className="w-[180px] text-lg p-3 border-2 border-background rounded-full bg-white outline-none"
      >
        <option value="easy">😉 Easy</option>
        <option value="medium">🙄 Medium</option>
        <option value="hard">😓 Hard</option>
      </select>
      {/* <Select onValueChange={() => handleSelect()} value={select}>
        <SelectTrigger
          className="w-[180px] text-lg p-3 border-2 border-background rounded-full bg-white"
          value={select}
        >
          <SelectValue placeholder="Select a difficalty" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem className="text-lg" value="easy">
              😉 Easy
            </SelectItem>
            <SelectItem className="text-lg" value="medium">
              🙄 Medium
            </SelectItem>
            <SelectItem className="text-lg" value="hard">
              😓 Hard
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}
      <Button onClick={onStart}>Start Quiz</Button>
    </div>
  );
};

export default Welcome;
