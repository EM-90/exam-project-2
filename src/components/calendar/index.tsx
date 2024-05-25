import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Booking } from '../../types';
import PrimaryButton from '../buttons/primaryButton';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { PriceCalculator } from '../priceCalculator';

interface DateRangePickerProps {
  onSubmit: (bookingData: { dateFrom: Date; dateTo: Date; guests: number, totalPrice: number }) => void;
  bookings: Booking[];
  pricePerNight: number;
  isOwner: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSubmit, bookings, pricePerNight, isOwner }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate && guests > 0) {
      onSubmit({ dateFrom: startDate, dateTo: endDate, guests, totalPrice });
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
    return className;
  };

  useEffect(() => {
    if (startDate && endDate) {
      const calculatedPrice = PriceCalculator(startDate, endDate, pricePerNight, getDatesInRange);
      setTotalPrice(calculatedPrice);

      const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      setNumberOfNights(nights);
    } else {
      setTotalPrice(0);
      setNumberOfNights(0);
    }
  }, [startDate, endDate, pricePerNight]);

  return (
    <form className=" gap-3 flex flex-wrap md:flex-wrap sm:flex-nowrap lg:flex-nowrap justify-between bg-none sm:bg-skin-infoBg p-3" onSubmit={handleSubmit}>
      <div className='calendar-container'>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update: [Date | null, Date | null]) => setDateRange(update as [Date | null, Date | null])}
          className="w-full border p-2"
          inline
          excludeDates={bookedDates}
          dayClassName={dayClassName}
          minDate={new Date()}
        />
      </div>
      {!isOwner && (
        <label className='lg:ml-2 w-full flex flex-col' htmlFor="guests">Guests
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
          <p className='text-lg font-medium'>Number of Nights: <span className='font-bold text-skin-primary'>{numberOfNights}</span></p>
          <p className='text-lg font-medium'>Total Price: <span className='font-bold text-skin-primary'>${totalPrice.toFixed(2)}</span></p>
          <PrimaryButton disabled={!user?.accessToken} type="submit" className="mt-2 p-2 bg-skin-primary text-white">
            Book Now
          </PrimaryButton>
          <p className='text-center pt-1'>You have to be a registered customer to book a venue</p>
          <Link className='text-center underline text-blue-900 font-medium' to='/profile'>Click here to register</Link>
        </label>
      )}
    </form>
  );
};

export default DateRangePicker;













