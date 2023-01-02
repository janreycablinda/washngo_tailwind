import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartwashDialogComponent } from './startwash-dialog.component';

describe('StartwashDialogComponent', () => {
  let component: StartwashDialogComponent;
  let fixture: ComponentFixture<StartwashDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartwashDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartwashDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
