import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[parallax-header]',
  host: {
    '(ionScroll)': 'onContentScroll($event)',
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class ParallaxHeader {

    header: any;
    cardslider: any;
    headerHeight: any;
    translateAmt: any;
    scaleAmt: any;
    slowDown: any;

    constructor(public element: ElementRef, public renderer: Renderer){

    }

    ngOnInit(){

        let content = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
        this.header = content.getElementsByClassName('hero-image')[0];
        this.cardslider = content.getElementsByClassName('parallax-card-slider')[0];
        if(this.header){
          this.headerHeight = this.header.offsetHeight;
          this.renderer.setElementStyle(this.header, 'webkitTransformOrigin', 'center bottom');
          this.renderer.setElementStyle(this.header, 'background-size', 'cover');
        }
    }

    onWindowResize(ev){
      if(this.header){
        this.headerHeight = this.header.offsetHeight;
      }
    }

    onContentScroll(ev){

        ev.domWrite(() => {
            this.updateParallaxHeader(ev);
        });

    }

    updateParallaxHeader(ev){

        if(!this.headerHeight) this.headerHeight = this.header.offsetHeight
      
        this.slowDown = (this.headerHeight-(ev.scrollTop*1.4))/this.headerHeight;

        if(ev.scrollTop >= 0){
            this.translateAmt = (ev.scrollTop*0.64);
            this.scaleAmt = 1;
        } else {
            this.translateAmt = 0;
            this.scaleAmt = -ev.scrollTop / this.headerHeight + 1;
        }
        if(this.header){
          if(this.slowDown > -0.4){
            this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,'+(this.translateAmt*this.slowDown)+'px,0) scale('+this.scaleAmt+','+this.scaleAmt+')');
          } else if(this.slowDown > -1) {
            this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,'+((this.translateAmt*this.slowDown) - (this.translateAmt*this.slowDown)*0.1 )+'px,0) scale('+this.scaleAmt+','+this.scaleAmt+')');
          }
        }
        if(ev.scrollTop < 275){
          if(this.cardslider) this.renderer.setElementStyle(this.cardslider, 'webkitTransform', 'translate3d(0,'+(-this.translateAmt/4)+'px,0)');
        }

    }

}
