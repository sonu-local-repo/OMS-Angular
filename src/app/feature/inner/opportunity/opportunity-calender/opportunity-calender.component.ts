import {
  Component,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
  Injectable,
  ViewEncapsulation,
  OnInit,
  Input,
  Inject,
  Optional,
} from '@angular/core';
import { WeekViewHourSegment } from 'calendar-utils';
import { isSameDay, isSameMonth, addHours, endOfWeek } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventTitleFormatter,
} from 'angular-calendar';
import {SchedulerService} from "../../../services/scheduler.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Scheduler} from "../../../model/scheduler.model";
import {HttpResponse} from "@angular/common/http";
import {ScheduleEvent} from "../../../model/scheduleevent";
import {map} from "rxjs/operators";
import {CreateScheduleDialogComponent} from "../create-schedule-dialog/create-schedule-dialog.component";
import {EventColorImpl} from "../../../model/EventColor";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }
}

@Component({
  selector: 'app-opportunity-calender',
  templateUrl: './opportunity-calender.component.html',
  styleUrls: ['./opportunity-calender.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  styles: [
    `
      .disable-hover {
        pointer-events: none;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class OpportunityCalenderComponent implements OnInit {
  private modal: NgbModal;
  private quoteId: number;
  dragToCreateActive = false;
  weekStartsOn: 0 = 0;
  private dragToSelectEvent: CalendarEvent;
  allQuotes: any;
  quoteLineIds: any;
  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private schedulerService: SchedulerService,
    @Optional() @Inject(MAT_DIALOG_DATA) private inputArguments: Scheduler
  ) {
    if (inputArguments) {
      this.quoteId = inputArguments ? inputArguments.quoteId : null;
      this.allQuotes = inputArguments ? inputArguments.quoteId : null;
      this.quoteLineIds = inputArguments ? inputArguments.quoteLineId : null;
    } else {
      this.inputArguments = new Scheduler();
    }

  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  ngOnInit(): void {


    this.schedulerService
      .getAllSchedules()
      .pipe(
        map((httpBody) => {
          // console.log(httpBody)
          return httpBody;
        })
      )
      .subscribe(calenderEvents => {
        const eventCol = new EventColorImpl();
        eventCol.primary = 'red';
        eventCol.secondary = 'green'

        calenderEvents.map(item => {
          item.start = new Date(item.start);
          item.end = new Date(item.end);
          item.assignedId = 1234567;
          item.color = eventCol;
          item.title = item.title +"\nAssigned To:" + item.assignedId;

          // console.log(item)
          item.meta = {
            tmpEvent: true,
          };
          item.resizable = {
            beforeStart: false, // this allows you to configure the sides the event is resizable from
            afterEnd: true,
          };
        });

        this.events = calenderEvents;
        // console.log(calenderEvents);
      });
  }
  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    this.dragToSelectEvent = {
      id: this.events.length,
      title: 'New event',
      start: segment.date,
      end: addHours(segment.date, 1),
      meta: {
        tmpEvent: true,
      },
      resizable: {
        beforeStart: false, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
    };

    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });
    if (this.dragToCreateActive) {
      this.popupCreateEventsDialog(this.dragToSelectEvent);
    }
  }

  refreshEvents() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }

  floorToNearest(amount: number, precision: number) {
    return Math.floor(amount / precision) * precision;
  }

  ceilToNearest(amount: number, precision: number) {
    return Math.ceil(amount / precision) * precision;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    // this.view = CalendarView.Week;
  }

  handleEvent(action: string, event: CalendarEvent): void {

    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  popupCreateEventsDialog(calenderEvent: CalendarEvent) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '480px';
    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = false;
    this.inputArguments.event = calenderEvent;
    dialogConfig.data = this.inputArguments;
    const dialogref = this.dialog.open(CreateScheduleDialogComponent, dialogConfig);
    dialogref.afterClosed().subscribe(scheduleEvent => {
      if (!scheduleEvent) {
        return;
      }
      calenderEvent.start = this.isDST(scheduleEvent.start);
      calenderEvent.end = this.isDST(scheduleEvent.end);
      calenderEvent.title = scheduleEvent.title;
      // calenderEvent.assigned = scheduleEvent.description;
      this.events = [...this.events, this.dragToSelectEvent];
    });
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.dragToSelectEvent.start = newStart;
    this.dragToSelectEvent.end = newEnd;
    this.refresh.next();
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  newEvent() {
    const schedulerEvent = {
      title: 'New event',
      start: new Date(),
      end: addHours(new Date(), 1),
      meta: {
        tmpEvent: true,
      },
      resizable: {
        beforeStart: false, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      }
    };
    this.popupCreateEventsDialog(schedulerEvent);
  }

  isDST(d) {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    // return Math.max(jan, jul) != d.getTimezoneOffset();
    if(Math.max(jan, jul) != d.getTimezoneOffset()){
      return new Date(d.setHours(d.getHours()+4));
    }else{
      return new Date(d.setHours(d.getHours()+5))
    }
  }
}
