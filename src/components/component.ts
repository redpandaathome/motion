import { PageComponent } from "./page/page";

export interface Component {
   attachTo(parent:HTMLElement, position?:InsertPosition):void;
   removeFrom(parent:HTMLElement):void
}

export class BaseComponent<T extends HTMLElement> implements Component {
   protected readonly element: T;
   constructor(htmlString:string){
      const template = document.createElement('template');
      template.innerHTML = htmlString;
      this.element = template.content.firstElementChild! as T; 
   }

   attachTo(parent:HTMLElement, position:InsertPosition='afterbegin'){
      parent.insertAdjacentElement(position, this.element);
   }

   removeFrom(parent:HTMLElement){
      if (this.element.parentElement !== parent){
         throw new Error('Parent mismatching!')
         
      }
      parent.removeChild(this.element);
   }
}
