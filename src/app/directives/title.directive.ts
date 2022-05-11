import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitle]',
})
export class TitleDirective {
  @Input() appTitle = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.outerHTML =
      '<p class="mb-2 text-3xl text-white-900">' + this.appTitle + '</p>';
  }
}
