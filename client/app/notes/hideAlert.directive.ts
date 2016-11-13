import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({ selector: '[hideAlert]' })
export class HideAlertDirective {
    constructor(el: ElementRef, renderer: Renderer) {
        setTimeout(()=> {
            renderer.setElementClass(el.nativeElement, 'active', true);
        }, 1000);
    }
}