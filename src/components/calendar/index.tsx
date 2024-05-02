import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker: React.FC = () => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <div className="flex ">
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={update => setDateRange(update)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                inline
            />
        </div>
    );
};

export default DateRangePicker;

