import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-card-tooltip',
  templateUrl: './info-card-tooltip.component.html',
  styleUrls: ['./info-card-tooltip.component.scss'],
})
export class InfoCardTooltipComponent implements OnInit {
  @Input() description;
  @Input() title;
  constructor() {}

  ngOnInit(): void {}
}
