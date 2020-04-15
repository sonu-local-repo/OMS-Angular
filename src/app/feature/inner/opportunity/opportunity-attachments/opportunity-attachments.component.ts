import {Component, Input, OnInit} from '@angular/core';
import {AttachmentService} from "../../../services/attachment.service";
import {AttachmentModel} from "../../../model/attachment.model";
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-opportunity-attachments',
  templateUrl: './opportunity-attachments.component.html',
  styleUrls: ['./opportunity-attachments.component.scss']
})
export class OpportunityAttachmentsComponent implements OnInit {

  processing: boolean;
  attachmentList: AttachmentModel[];
  @Input() opportunityId: number;
  attachment: AttachmentModel = new AttachmentModel();

  public files: NgxFileDropEntry[] = [];

  constructor(private attachmentService: AttachmentService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.fetchAttachments();
  }

  fetchAttachments(){
    this.spinner.show();
    this.attachmentService.fetchAttachmentByParentId(this.opportunityId).subscribe(data=>{
      this.attachmentList = data;
      this.spinner.hide()
    });
  }

//NgxFileDropEntry

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.spinner.show();
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          const data: FormData = new FormData();

          data.append("content", file);

          this.attachmentService.uploadAttachments(data, this.opportunityId).subscribe(data => {
            // console.log(data);
            this.fetchAttachments();
            this.spinner.hide();
          })

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    // console.log(event);
  }

  public fileLeave(event){
    // console.log(event);
  }

  viewAttachment(attachment: AttachmentModel) {
    // console.log(this.attachmentService.getBrowserName());
    this.attachmentService.viewAttachmentById(attachment.id).subscribe(data=>{
      // console.log(data);
        let file = new Blob([data]);
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank"); // if you want to open it in new tab
        if (this.attachmentService.getBrowserName() === 'chrome') {
          saveAs(file, attachment.name);
        }

    },
    error => console.log(error))
  }



}
