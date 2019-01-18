import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

import { ConfigFile, ConflictFile } from 'models/config-file';

/**
 * The conflict dialog component
 */
@Component({
  selector: 'app-conflict-dialog',
  templateUrl: './conflict-dialog.component.html',
  styleUrls: ['./conflict-dialog.component.scss']
})
export class ConflictDialogComponent {

  fileIdx = 0;

  /**
   * initializes the component
   * @param dialogRef the reference to a dialog opened via the MatDialog service
   * @param data the injection token that can be used to access the data that was passed in to a dialog
   */
  constructor(public dialogRef: MatDialogRef<ConflictDialogComponent>,
    // private yamlService: YamlService,
    @Inject(MAT_DIALOG_DATA) public data) {
    dialogRef.disableClose = true;
  }

  setFileIdx(_fileIdx: number) {
    this.fileIdx = _fileIdx;
  }

  resolveConflict($event, file: ConflictFile) {
    file.resolveStrategy = $event.value;
  }

  allResolved() {
    return !_.filter(this.data.conflictFiles, f => !f.resolveStrategy).length;
  }

  /**
   * handles the confirm action
   */
  confirmAction() {

    // Convert conflict files
    const files = this.data.conflictFiles.map((file: ConflictFile) => {
      const result: ConfigFile = {
        fileName: file.fileName,
        applicationName: file.applicationName,
        size: file.size,
        draftYaml: file.resolveStrategy === 'draft' ? file.draftYaml : file.originalYaml,
        originalYaml: file.originalYaml,
        draftConfig: file.resolveStrategy === 'draft' ? file.draftConfig : file.originalConfig,
        originalConfig: file.originalConfig,
      };

      return result;
    });


    this.dialogRef.close(files);
  }
}
