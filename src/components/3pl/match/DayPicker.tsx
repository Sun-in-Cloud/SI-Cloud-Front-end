import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { styled } from 'styled-components';

const DayPicker = (props: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const YEARS = Array.from({ length: 30 }, (_, i) => getYear(new Date()) + i);
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const moment = require('moment');

  return (
    <StyledDatePicker
      showPopperArrow={false}
      dateFormat="yyyy-MM-dd"
      formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
      showYearDropdown
      scrollableYearDropdown
      shouldCloseOnSelect
      yearDropdownItemNumber={100}
      minDate={new Date()}
      selected={selectedDate}
      onChange={(date: Date | null) => {
        setSelectedDate(date);
        props.getDate(moment(date).format('yyyy-MM-DD'));
      }}
      renderCustomHeader={({
        date,
        changeYear,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <CustomHeaderContainer>
          <div>
            <Month>{MONTHS[getMonth(date)]}</Month>
            <Year
              value={getYear(date)}
              onChange={({ target: { value } }) => {
                changeYear(+value);
              }}
            >
              {YEARS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Year>
          </div>
          <div>
            <MonthBtn type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <img src="   https://cdn-icons-png.flaticon.com/512/2609/2609370.png " width={'30px'} />
            </MonthBtn>
            <MonthBtn type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <img src="   https://cdn-icons-png.flaticon.com/512/318/318476.png" width={'30px'} />
            </MonthBtn>
          </div>
        </CustomHeaderContainer>
      )}
    />
  );
};
const StyledDatePicker = styled(ReactDatePicker)`
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  appearance: none;
  border-radius: 0;
  background: none transparent;
  vertical-align: middle;
  font-size: inherit;
  color: inherit;
  box-sizing: content-box;
  margin: 0;
  width: 400px;
  border-radius: 0.5rem;
  padding: 0.75rem 2.5rem 0.65rem 0.75rem;
  box-shadow: none;
  box-sizing: border-box;
  display: block;
  border: 2px solid #ddd;
  line-height: 1.06;

  &:focus {
    border: 2px solid colors.$ORANGE;
  }
`;

const CustomHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: colors.$BG_COLOR;
  height: 100%;
  margin-top: 8px;
  padding: 0 12px 0 24px;
`;

const Month = styled.span`
  font-size: 16px;
  font-weight: 500;
  font-family: jalnan;
`;

const Year = styled.select`
  width: 80px;
  height: 34px;
  padding: 5px;
  margin-left: 5px;
  border: none;
  background-color: colors.$BG_COLOR;
  font-family: jalnan;

  &:hover {
    background-color: rgba(colors.$WHITE, 0.08);
  }

  &:disabled {
    cursor: default;
    background-color: colors.$BG_COLOR;

    svg {
      fill: #575757;
    }
  }
`;
const MonthBtn = styled.button`
  background-color: colors.$BG_COLOR;
  border: none;
`;

export default DayPicker;
