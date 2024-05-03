import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker: React.FC = () => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <form className="flex flex-col ">
            <div className='calendar-container'>
                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={update => setDateRange(update)}
                    className="w-full"
                    inline
                />
            </div>
        </form>
    );
};

export default DateRangePicker;

