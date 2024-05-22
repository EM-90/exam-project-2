
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Booking } from '../../types';

interface DateRangePickerProps {
  onSubmit: (bookingData: { dateFrom: Date; dateTo: Date; guests: number }) => void;
  bookings: Booking[];
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSubmit, bookings }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate && guests > 0) {
      onSubmit({ dateFrom: startDate, dateTo: endDate, guests });
    } else {
      alert("Please select valid dates and number of guests.");
    }
  };


  const normalizeDate = (date: Date): Date => {
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    localDate.setHours(0, 0, 0, 0);
    return localDate;
  };

  const isBooked = (date: Date): boolean => {
    const normalizedDate = normalizeDate(date);
    return bookings.some(booking => {
      const bookingStart = normalizeDate(new Date(booking.dateFrom));
      const bookingEnd = normalizeDate(new Date(booking.dateTo));
      console.log(`Checking if ${normalizedDate.toDateString()} is between ${bookingStart.toDateString()} and ${bookingEnd.toDateString()}`);
      return normalizedDate >= bookingStart && normalizedDate <= bookingEnd;
    });
  };

  const dayClassName = (date: Date): string => {
    const isBookedDate = isBooked(date);
    const className = isBookedDate ? 'bg-gray-300 rounded-md text-white text-lg' : 'bg-green-100 rounded-md text-lg';
    console.log(`Date ${date.toDateString()} is ${isBookedDate ? "booked" : "available"}, class: ${className}`);
    return className;
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className='calendar-container'>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={update => setDateRange(update as [Date | null, Date | null])}
          className="w-full border p-2"
          inline
          dayClassName={dayClassName}
        />
      </div>
      <input
        type="number"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value))}
        min="1"
        className="mt-2 w-36 p-2 border"
        placeholder="Number of Guests"
      />
      <button type="submit" className="mt-2 ml-2 p-2 bg-skin-primary text-white">Book Now</button>
    </form>
  );
};

export default DateRangePicker;









