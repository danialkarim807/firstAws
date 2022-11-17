import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepicker,
} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;

@Injectable()
export class FiveDayRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  correctionTable = {
    Sun: [0, 6],
    Mon: [-1, 5],
    Tue: [-2, 4],
    Wed: [-3, 3],
    Thu: [-4, 2],
    Fri: [-5, 1],
    Sat: [-6, 0],
  };
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      console.log(date);
      const dayOfWeek = date.toString().split(' ')[0];
      const correction = this.correctionTable[dayOfWeek];
      const start = this._dateAdapter.addCalendarDays(date, correction[0]);
      const end = this._dateAdapter.addCalendarDays(date, correction[1]);
      console.log(new DateRange<D>(start, end));

      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

// @Component({
// })
// export class TimeRangeComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }
/** @title Date range picker with custom a selection strategy */
@Component({
  selector: 'app-time-range',
  templateUrl: './time-range.component.html',
  styleUrls: ['./time-range.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
})
export class TimeRangeComponent {
  date = new FormControl(moment());
  setMonthAndYear(event, dp) {}
}
