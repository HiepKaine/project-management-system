import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Attendance } from '@frontend/models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService extends BaseService<Attendance> {
  public override url = 'attendance';
}
