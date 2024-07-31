export interface TableData {
  questionTitle: string;
  questionStatus: string;
  questionStartTime: string;
  questionId: string;
  questionEndTime: string;
  passMark: number;
}

export interface ITableData {
  tableHeadings: string[];
  tableData: TableData[];
  showLoadingState: boolean;
}

export interface IResponseData {
  status: number;
  questions: TableData[];
  message: string;
}

export interface ImageData {
  snapshot: string;
  dateCreated: string;
}

export interface ISnapshots {
  status: number;
  snapshots: ImageData[];
  message: string;
}
