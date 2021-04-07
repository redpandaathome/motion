import { ImageComponent } from './components/page/item/image.js';
import { BaseComponent, Component } from './components/component.js'
import { PageComponent, PageItemComponent, Composable } from './components/page/page.js' 
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { InputDialog } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/input/media-input.js';
import { TextSectionInput } from './components/input/text-input.js';

class App {
   // private readonly page:PageComponent;
   private readonly page:Component&Composable;

   constructor(appRoot:HTMLElement, dialogRoot:HTMLElement){
      this.page = new PageComponent(PageItemComponent)
      this.page.attachTo(appRoot, 'afterbegin')

      const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
      imageBtn.addEventListener("click", ()=>{
         const dialog = new InputDialog();
         const inputSection = new MediaSectionInput();
         dialog.addChild(inputSection);
         dialog.attachTo(dialogRoot);

         dialog.setOnCloseListener(()=>{
            dialog.removeFrom(dialogRoot)
         });

         dialog.setOnSubmitListener(()=>{
            const image = new ImageComponent(inputSection.title, inputSection.url)
            this.page.addChild(image)
            dialog.removeFrom(dialogRoot)
         });
      })

      const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
      videoBtn.addEventListener('click', ()=>{
         const dialog = new InputDialog();
         const inputSection = new MediaSectionInput();
         dialog.addChild(inputSection)
         dialog.attachTo(dialogRoot)

         dialog.setOnCloseListener(()=>{
            dialog.removeFrom(dialogRoot)
         })
         dialog.setOnSubmitListener(()=>{
            const video = new VideoComponent(inputSection.title, inputSection.url);
            this.page.addChild(video);
            dialog.removeFrom(dialogRoot)
         })
      })
   
      const noteBtn = document.querySelector("#new-note")! as HTMLButtonElement;
      noteBtn.addEventListener('click', ()=>{
         const dialog = new InputDialog();
         const inputSection = new TextSectionInput();
         dialog.addChild(inputSection)
         dialog.attachTo(dialogRoot)

         dialog.setOnCloseListener(()=>{
            dialog.removeFrom(dialogRoot)
         })
         dialog.setOnSubmitListener(()=>{
            const note = new NoteComponent(inputSection.title, inputSection.body);
            this.page.addChild(note);
            dialog.removeFrom(dialogRoot)
         })
      })

      const todoBtn = document.querySelector("#new-todo")! as HTMLButtonElement;
      todoBtn.addEventListener('click', ()=>{
         const dialog = new InputDialog();
         const inputSection = new TextSectionInput();
         dialog.addChild(inputSection)
         dialog.attachTo(dialogRoot)

         dialog.setOnCloseListener(()=>{
            dialog.removeFrom(dialogRoot)
         })
         dialog.setOnSubmitListener(()=>{
            const todo = new TodoComponent(inputSection.title, inputSection.body);
            this.page.addChild(todo);
            dialog.removeFrom(dialogRoot)
         })
      })

      // For demo :)
      this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
      this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
      this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
      this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
      this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
      this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
      this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
      this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
   }
}

new App(document.querySelector('.document')! as HTMLElement, document.body)