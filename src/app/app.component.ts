import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {UtilService} from './services/util.service';
import { catchError, takeUntil } from 'rxjs/operators';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy  {
  destroy$: Subject<any> = new Subject();
  pictureForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.pictureForm = this.formBuilder.group({
     // basicfile: [null, [Validators.required, this.imageValidator]],
      basicfile: [null, Validators.required],
      inputFile: [null]
    });
    this.pictureForm
    .get('basicfile')
    .valueChanges.pipe(takeUntil(this.destroy$))
    .subscribe((newValue) => {
      console.log(newValue);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        console.log(loadEvent.target.result);
      };
      reader.readAsText(newValue.files[0]);
    });
    this.pictureForm
    .get('inputFile')
    .valueChanges.pipe(takeUntil(this.destroy$))
    .subscribe((newValue) => {
      console.log(newValue);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        console.log(loadEvent.target.result);
      };
      reader.readAsText(newValue.files[0]);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  onChange(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    const txtFormat = /(.txt)$/;
    const excelFormat = /((.xls)|(.xlsx))$/;
    if (txtFormat.test(file.name)) {
      reader.onload = (loadEvent) => {
        console.log(loadEvent.target.result);
      };
      reader.readAsText(file);
    } else if (excelFormat.test(file.name)) {
      reader.onload = (loadEvent) => {
        const workbook = xlsx.read(loadEvent.target.result, { type: 'binary'});
        const data = workbook.SheetNames.reduce((acc, item) => {
          const row = xlsx.utils.sheet_to_json(workbook.Sheets[item]);
          console.log(row);
          acc.push(row);
          return acc;
        }, []);
        console.log(data.flat());
      };
      reader.readAsBinaryString(file);
    }
  }
}

