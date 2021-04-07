import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = ()=>void;
type OnSubmitListener = ()=>void;
export class InputDialog extends BaseComponent<HTMLElement> implements Composable{
   private closeListener?:OnCloseListener;
   private submitListener?:OnSubmitListener;

   constructor(){
      super(`<dialog class="dialog">
               <div class="dialog__container">
                  <button class="close">X</button>
                  <div id="dialog__body"></div>
                  <button class="dialog_submit">ADD</button>
               </div>
            </dialog>`)
      
      const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
      closeBtn.onclick = () => {
         this.closeListener&&this.closeListener()
      }

      const submitBtn = this.element.querySelector('.dialog_submit')! as HTMLButtonElement;
      submitBtn.onclick = () => {
         this.submitListener&&this.submitListener();
      }

   }
   setOnCloseListener(listener:OnCloseListener){
      this.closeListener = listener;
   }

   setOnSubmitListener(listener:OnSubmitListener){
      this.submitListener = listener;
   }

   addChild(child:Component){
      const body = this.element.querySelector("#dialog__body")! as HTMLElement;
      child.attachTo(body);
   }
}