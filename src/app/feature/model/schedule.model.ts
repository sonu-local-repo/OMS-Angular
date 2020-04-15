
import { CalendarEvent } from 'angular-calendar';

export class ScheduleModel {
  id: number;
  start: Date;
  end: Date;
  title: string;
  assignedId?: number;
  color?: import('calendar-utils').EventColor;
  actions?: import('calendar-utils').EventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: { beforeStart?: boolean; afterEnd?: boolean; };
  draggable?: boolean;
  meta?: any;
  assigneeId: number;
  description: string;
  timeZone?: string;
  quoteId: number;
  accountId: number;
  quoteLineId?:number;
  quoteLineItemId: number;
  optyId: number;
}
