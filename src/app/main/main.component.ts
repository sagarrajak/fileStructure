import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from '../new-folder-dialog/new-folder-dialog.component';

interface Node {
  name: string;
  children?: Node[];
}

export interface IDialogData {
  isFile: boolean
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public treeControl = new NestedTreeControl<Node>(node => node.children);
  public dataSource = new MatTreeNestedDataSource<Node>();

  constructor(public dialog: MatDialog) {
    this.dataSource.data = [{
      name: 'root'
    }];
  }

  public deleteNode(node: Node) { }

  public addFolder(parentnode: Node) { 
    this.openDialog(false, parentnode);
  }

  public addFile(parentnode: Node) {
    this.openDialog(true, parentnode);
  }

  public hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;


  public addToRoot(name: string): void {

  }

  public openDialog(isFile: boolean, parentnode: Node): void {
    const dialog = this.dialog.open(NewFolderDialogComponent, {
      width: '250px',
      autoFocus: false,
      data: {
        isFile
      }
    })
    dialog.afterClosed().subscribe(result => {
      console.log({ result });
    });
  }
}
