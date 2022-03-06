import React, { SyntheticEvent } from 'react';
import { themes } from '../../const/themes';

type Props = {
  dataTheme: string;
  setDataTheme: (theme: string) => void;
};

const ColorPicker = ({ dataTheme, setDataTheme }: Props) => {
  return (
    <div className="mt-2 form-control w-full">
      <label className="label justify-center">
        <span className="font-bold">Accent</span>
      </label>
      <select
        className=" w-full select select-secondary border-4 font-bold"
        defaultValue={dataTheme}
        onChange={(e: SyntheticEvent<HTMLSelectElement, Event>) =>
          setDataTheme(e.currentTarget.value)
        }>
        {themes.map((theme) => (
          <option key={theme.name} value={theme.name}>
            {theme.accent}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorPicker;
