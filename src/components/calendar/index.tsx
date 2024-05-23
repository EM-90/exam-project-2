import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Booking } from '../../types';
import PrimaryButton from '../buttons/primaryButton';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';

interface DateRangePickerProps {
  onSubmit: (bookingData: { dateFrom: Date; dateTo: Date; guests: number }) => void;
  bookings: Booking[];
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSubmit, bookings }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState<number>(1);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate && guests > 0) {
      onSubmit({ dateFrom: startDate, dateTo: endDate, guests });
    } else {
      alert("Please select valid dates and number of guests.");
    }
  };

  const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const getBookedDates = (bookings: Booking[]): Date[] => {
    const bookedDates: Date[] = [];
    bookings.forEach(booking => {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);
      bookedDates.push(...getDatesInRange(bookingStart, bookingEnd));
    });
    return bookedDates;
  };

  const bookedDates = getBookedDates(bookings);

  const isBooked = (date: Date): boolean => {
    return bookedDates.some(bookedDate => date.toDateString() === bookedDate.toDateString());
  };

  const isPastDate = (date: Date): boolean => {
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  const dayClassName = (date: Date): string => {
    if (isPastDate(date)) {
      return 'text-lg';
    }
    const isBookedDate = isBooked(date);
    const className = isBookedDate ? 'line-through rounded-md text-white text-lg' : 'bg-green-100 rounded-md text-lg';
    console.log(`Date ${date.toDateString()} is ${isBookedDate ? "booked" : "available"}, class: ${className}`);
    return className;
  };

  return (
    <form className="flex justify-between bg-skin-infoBg p-3" onSubmit={handleSubmit}>
      <div className='calendar-container'>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={update => setDateRange(update as [Date | null, Date | null])}
          className="w-full border p-2"
          inline
          excludeDates={bookedDates}
          dayClassName={dayClassName}
          minDate={new Date()}
        />
      </div>
      <label className='ml-4 w-full flex flex-col' htmlFor="guests">Guests
        <input
          type="number"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          min="1"
          max="4"
          className="mt-2 p-2 border"
          placeholder="Number of Guests"
        />
        <PrimaryButton disabled={!user?.accessToken} type="submit" className="mt-2 p-2 bg-skin-primary text-white">
          Book Now
        </PrimaryButton>
        <p className='text-center pt-1'>You have to be a registered customer to book a venue</p>
        <Link className='text-center underline text-blue-900 font-medium' to='/profile'>Click here to register</Link>
      </label>
    </form>
  );
};

export default DateRangePicker;













